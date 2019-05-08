import React from 'react';

import parseSwaggerDocumentation from './parser/parseSwaggerDocumentation';
import theme from './Theme';
import AdminLoader from './admin/AdminLoader';
import authProvider from './admin/auth/AuthProvider';
import { Redirect } from 'react-router-dom';
import jsonClient, { RequestParamListInterface } from './admin/client/jsonClient';
import { ApiInterface } from './model/Api';

export default (
    endpoint: string,
    specOverwrite: any = {},
    title: string = 'Ivoz Provider Admin Portal'
) => {
    const entrypoint: string = `https://${window.location.hostname}/${endpoint}/`;
    const baseUrl = new URL(entrypoint);

    const fetchHeaders = {'Authorization': `Bearer ${window.localStorage.getItem('token')}`};

    const dataProvider = (api: ApiInterface) => {
        const client = jsonClient(baseUrl);

        return (type:string, resource:string, params:RequestParamListInterface) => {

            params.headers = fetchHeaders;
            const entity = api.resources.find(function (entity) {
                return entity.name === resource;
            });

            if (!entity) {
                throw Error('Entity was not found');
            }

            return client(type, entity.basePath, params);
        }
    }

    const apiDocumentationParser =
        (entrypoint:string) => parseSwaggerDocumentation(
            entrypoint,
            specOverwrite
        )
        .then(
            ({ api }) => ({ api }),
            (result) => {

                switch (!result.status || result.status < 200 || result.status > 400) {
                    case true:
                        return Promise.resolve({
                            api: result.api,
                            customRoutes: [{
                                props: {
                                    path: '/',
                                    render: () => {
                                        return <Redirect to={`/login`}/>
                                    }
                                },
                            }],
                        });

                    default:
                        return Promise.reject(result);
                }
            },
        );

    return (props:any) => (
        <AdminLoader
            title={title}
            apiDocumentationParser={apiDocumentationParser}
            authProvider={authProvider}
            entrypoint={baseUrl.toString()}
            dataProvider={dataProvider}
            theme={theme}
        />
    );

}
