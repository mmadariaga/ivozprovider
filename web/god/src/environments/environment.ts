// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const API_URL = 'https://10.10.3.21/api/platform';

export const environment = {
    production: false,
    baseUrl: API_URL,
    openApiSpec: `${API_URL}/swagger.json`,
    login: {
        url: `${API_URL}/admin_login`
    },
    ws: {
        protocol: 'wss://',
        port: '8080',
        endpoint: 'realtime'
    }
};
