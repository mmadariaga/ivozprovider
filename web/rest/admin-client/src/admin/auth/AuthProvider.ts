import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

const baseUrl = new URL(`https://${window.location.hostname}/api/platform/`);
const loginUrl = new URL('admin_login', baseUrl);

interface AuthParamListInterface {
    username: string,
    password: string,
    status?: number
}

export default (type: string, params:AuthParamListInterface) => {

    switch (type) {
        case AUTH_LOGIN:
            const { username, password } = params;

            let formArr = [];
            formArr.push(['username', "=", encodeURIComponent(username).replace(/%20/g,"+")].join(""));
            formArr.push(['password', "=", encodeURIComponent(password).replace(/%20/g,"+")].join(""));

            const request = new Request(loginUrl.href, {
                method: 'POST',
                headers: new Headers({
                    'Accept' : 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
                body: formArr.join("&"),
            });

            return fetch(request)
                .then(response => {

                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.statusText);
                    }

                    return response.json();
                })
                .then(({ token }) => {
                    localStorage.setItem('token', `Bearer ${token}`); // The JWT token is stored in the browser's local storage
                    window.location.replace('/platform-client');
                });

        case AUTH_LOGOUT:
            localStorage.removeItem('token');
            break;

        case AUTH_ERROR:
            if (401 === params.status || 403 === params.status) {
                localStorage.removeItem('token');

                return Promise.reject();
            }
            break;

        case AUTH_CHECK:
            return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();

        default:
            return Promise.resolve();
    }
}

