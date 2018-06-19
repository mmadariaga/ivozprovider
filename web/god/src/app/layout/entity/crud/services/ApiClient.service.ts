import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, Subscription, of, throwError, ObservableInput, ObservableLike, combineLatest } from 'rxjs';
import { catchError, tap, map, withLatestFrom, last, filter, shareReplay } from 'rxjs/operators'

import Collection from '@crud/models/Collection';
import { environment } from '@env/environment';
import Item from '@app/layout/entity/crud/models/Item';

import ApiSpecInterface from '@crud/interfaces/ApiSpecInterface';
import * as pluralize from 'pluralize';

@Injectable()
export default class ApiClientService {

    private apiSpec$: Observable<Object>;
    private parsedSpecs: Object;

    constructor(private httpClient: HttpClient) {
        this.apiSpec$ = this.loadOpenApiSpec();
    }

    public get(
        endpoint: string,
        id: string
    ): Observable<Item> {

        return combineLatest(
            this.apiSpec$,
            this.getRequest(`${environment.baseUrl}/${endpoint}/${id}`),
        ).pipe(
            map(([apiSpec, response]) => {
                return this.createItem(endpoint, apiSpec, response)
            })
        );
    }

    public getCollection(
        endpoint: string,
        page?: number,
        order: any = {},
        itemsPerPage?: number,
        params: any = {}
    ): Observable<Collection> {

        const queryStringParams = this.prepareQueryStringParams(
            endpoint,
            page,
            order,
            itemsPerPage,
            params
        );
        console.log('> queryStringParams', queryStringParams);

        return combineLatest(
            this.apiSpec$,
            this.getRequest(`${environment.baseUrl}/${endpoint}`, queryStringParams),
        ).pipe(
            map(([apiSpec, response]) => this.createCollection(endpoint, apiSpec, response)),
        );
    }

    public update(
        endpoint: string,
        id: number,
        body: Object
    ): Observable<Object> {

        return this.httpClient
            .put(
                `${environment.baseUrl}/${endpoint}/${id}`,
                body
            )
            .pipe(
                catchError(() => throwError(new Error('Request error')))
            );
    }

    public remove(
        endpoint: string,
        id: number
    ): Observable<Object> {
        return this.httpClient
            .delete(`${environment.baseUrl}/${endpoint}/${id}`)
            .pipe(
                catchError(() => throwError(new Error('Request error')))
            );
    }

    public getEntityBasePath(entityNameRoot: string): string {

        const pluralized = pluralize(entityNameRoot);
        const underScored = pluralized.replace(/([A-Z])/g, $1 => {
            return "_"+$1.toLowerCase();
        });

        return '/' + underScored.slice(1);
    }

    ///////////////////////////////////////////////////////////////
    // Private
    ///////////////////////////////////////////////////////////////

    private prepareQueryStringParams(
        endpoint: string,
        page?: number,
        order: any = {},
        itemsPerPage?: number,
        params: any = {}
    ): string {

        params = this.stringifyObjectValues(params);
        const queryStringParams = {
            ...params
        };

        if (Object.keys(order).length) {
            queryStringParams._order =  this.stringifyObjectValues(order);
        }

        if (page) {
            if (page < 0) {
                queryStringParams._pagination = false;
            } else {
                queryStringParams._page = page;
            }
        }

        if (itemsPerPage) {
            queryStringParams._itemsPerPage = itemsPerPage;
        }

        return queryStringParams;
    }

    private stringifyObjectValues(object : Object) {
        let response = {};
        Object.keys(object).map(
            (key) => { response[key] = String(object[key]); }
        );

        return response;
    }

    private loadOpenApiSpec(): Observable<Object> {

        return this.httpClient
           .get(environment.openApiSpec)
           .pipe(
                map((response: any) => {
                    return this.parseSpec({
                            definitions: response.definitions,
                            paths: response.paths,
                        }
                    );
                }),
                shareReplay(1)
           );
    }

    private filterNull(value): boolean {
        return value !== null;
    };

    private getRequest(endpoint, queryStringParams?: Object): Observable<any> {

        return this.httpClient
            .get(endpoint, {params: queryStringParams})
            .pipe(
                catchError(() => throwError(new Error('Request error')))
            );
    }

    private createCollection(endpoint: string, apiSpec, response): Collection {

        const entity = this.endpointToEntityName(endpoint);
        const entitySpec = apiSpec[entity];
        const path = entitySpec.collection['get'];
        const schema = path.responses[200].schema;
        const definition = schema.items.$ref;

        return new Collection(response, definition);
    }

    private createItem(endpoint: string, apiSpec, response): Item {

        const entity = this.endpointToEntityName(endpoint);
        const entitySpec = apiSpec[entity];
        const path = entitySpec.item['get'];
        const schema = path.responses[200].schema;
        const definition = schema.$ref;

        return new Item(response, definition, entitySpec);
    }

    private parseSpec(apiSpec: ApiSpecInterface): Object {

        let response = {};
        for (let entityName in apiSpec.definitions) {

            const entityNameRoot = entityName.split('-').shift();
            if (response[entityNameRoot]) {
                continue;
            }

            const basePath = this.getEntityBasePath(entityNameRoot);
            if (!apiSpec.paths[basePath]) {
                // console.log(`Skiping ${basePath}`);
                continue;
            }

            const entitySpec = this.getEntitySpec(
                basePath,
                apiSpec
            );

            response[entityNameRoot] = {
                basePath: basePath,
                ...entitySpec
            }
        }

        return response;
    }

    private endpointToEntityName(endpointRoot: string): string {

        let response = '';
        const segments = endpointRoot.split(/[_\-]+/);

        for (const segment of segments) {
            response += segment.charAt(0).toUpperCase() + segment.slice(1);
        }

        return pluralize.singular(response);
    }

    private getEntitySpec(entity: string, apiSpec: ApiSpecInterface): Object {

        const pattern = `^${entity}(\/.*)?$`;
        const regExp = new RegExp(pattern);

        const entityPaths = Object
            .keys(apiSpec.paths)
            .filter(path  => {
                return path.search(regExp) === 0;
            });

        let response = {
            item: {},
            collection: {}
        };

        for (let path of entityPaths) {

            if (path.indexOf('{id}') > 0) {
                response.item = {
                    ...response.item,
                    ...apiSpec.paths[path]
                };
                continue;
            }

            if (apiSpec.paths[path].post) {
                response.item['post']  = {
                    ...apiSpec.paths[path].post
                };
            }

            if (apiSpec.paths[path].get) {
                response['collection'] = {
                    get: {
                        ...apiSpec.paths[path].get
                    }
                };
            }
        }

        return this.resolvePathDefinitionsRecursively(response, apiSpec);
    }

    /**
     * Updates value by reference
     * @param value
     * @param apiSpec
     * @returns void
     */
    private resolvePathDefinitionsRecursively(value: any, apiSpec) {
        for (let idx in value) {

            if (idx === '$ref') {

                const ref = value.$ref.split('/').pop();
                value.$ref = {};
                value.$ref.model = ref;
                value.$ref.properties = this.deepClone(apiSpec.definitions[ref].properties);
                continue;
            }

            if (typeof value[idx] === 'object') {
                this.resolvePathDefinitionsRecursively(value[idx], apiSpec);
            }
        }

        return value;
    }

    private deepClone(value) {
        return JSON.parse(JSON.stringify(value));
    }
}