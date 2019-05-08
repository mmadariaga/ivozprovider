import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';

import isPlainObject from 'lodash.isplainobject';


interface PaginationParamsInterface {
    page: string,
    perPage: string
}

interface SortParamsInterface {
    field: string,
    order: string
}

interface FilterParamValueInterface {
    [action:string]: string
}

interface FilterParamsInterface {
    [field:string]: FilterParamValueInterface | string
}

interface RequestHeadersInterface {
    [field:string]: string
}

export interface RequestParamListInterface {
    id?: string,
    ids?: string[],
    data?: Object,
    headers: RequestHeadersInterface,
    pagination: PaginationParamsInterface,
    sort: SortParamsInterface,
    filter: FilterParamsInterface
}

interface ResponseInterface {
    headers: Headers,
    json: any
}

export default (apiUrl: URL, httpClient = fetchUtils.fetchJson) => {

    const convertDataRequestToHTTP = (type: string, resource:string, params: RequestParamListInterface) => {

        const baseUrl = new URL(resource, apiUrl);
        const headers = new Headers({
            accept: 'application/json'
        });
        const options:any = {headers};

        if (params.headers) {
            for (const idx in params.headers) {
                headers.set(idx, params.headers[idx])
            }
        }

        if (window.localStorage.getItem('token')) {
            options.user = {
                authenticated: true,
                token: window.localStorage.getItem('token')
            };
        }

        switch (type) {
            case GET_LIST:

                const {
                    pagination: {page, perPage},
                    sort: {field, order},
                } = params;

                if (order) baseUrl.searchParams.set(`_order[${field}]`, order);
                if (page) baseUrl.searchParams.set('_page', page);
                if (perPage) baseUrl.searchParams.set('_itemsPerPage', perPage);
                if (params.filter) {
                    Object.keys(params.filter).forEach(key => {
                        const filterValue = params.filter[key];
                        if (!isPlainObject(filterValue)) {
                            baseUrl.searchParams.set(key, (params.filter[key] as string));
                            return;
                        }

                        Object.keys(filterValue).forEach(subKey => {
                            baseUrl.searchParams.set(
                                `${key}[${subKey}]`,
                                (filterValue as FilterParamValueInterface)[subKey],
                            );
                        });
                    });
                }
                console.debug('GET_LIST', decodeURIComponent(baseUrl.toString()));
                break;

            case GET_ONE:

                baseUrl.pathname += `/${params.id}`;
                console.debug('GET_ONE', decodeURIComponent(baseUrl.toString()));
                break;

            case GET_MANY:

                const ids = params.ids || [];
                ids.forEach(id => {
                    baseUrl.searchParams.set(
                        `id[]`,
                        id,
                    );
                });
                baseUrl.searchParams.set('_pagination', 'false');
                console.debug('GET_MANY', decodeURIComponent(baseUrl.toString()));
                //debugger;
                break;

            case GET_MANY_REFERENCE:

                console.log('GET_MANY_REFERENCE');
                debugger;
                //const { page, perPage } = params.pagination;
                //const { field, order } = params.sort;
                //const query = {
                //    sort: JSON.stringify([field, order]),
                //    range: JSON.stringify([
                //        (page - 1) * perPage,
                //        page * perPage - 1,
                //    ]),
                //    filter: JSON.stringify({
                //        ...params.filter,
                //        [params.target]: params.id,
                //    }),
                //};
                //url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;

            case UPDATE:

                baseUrl.pathname += `/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                console.debug('UPDATE', decodeURIComponent(baseUrl.toString()));
                break;

            case CREATE:

                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                console.debug('CREATE', decodeURIComponent(baseUrl.toString()));
                break;

            case DELETE:

                baseUrl.pathname += `/${params.id}`;
                options.method = 'DELETE';
                console.debug('DELETE', decodeURIComponent(baseUrl.toString()));
                break;

            default:
                debugger;
                throw new Error(`Unsupported fetch action type ${type}`);
        }

        return {
            url: baseUrl.toString(),
            options
        };
    };

    const convertHTTPResponse = (response: ResponseInterface, type: string, resource: string, params: RequestParamListInterface) => {
        const { headers, json } = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                return {
                    data: json,
                    total: parseInt(
                        headers.get('X-Total-Items') || '25',
                        10
                    ),
                };
            case CREATE:
                return { data: { ...params.data, id: json.id } };
            default:
                return { data: json };
        }
    };

    return (type: string, resource: string, params: RequestParamListInterface) => {

        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {

            if (!params.ids) {
                throw Error('ids were expected');
            }

            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data),
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {

            if (!params.ids) {
                throw Error('ids were expected');
            }

            return Promise.all(
                params.ids.map(id => {

                    const { url, options } = convertDataRequestToHTTP(
                        'DELETE',
                        resource,
                        {
                            id,
                            ...params
                        }
                    );

                    return httpClient(
                        url,
                        options
                    );
                })
            ).then(responses => ({
                data: responses.map(response => convertHTTPResponse(response, type, resource, params)),
            }));
        }

        const { url, options } = convertDataRequestToHTTP(
            type,
            resource,
            params
        );

        return httpClient(url, options).then((response: any) => {
            return convertHTTPResponse(response, type, resource, params)
        });
    };
};
