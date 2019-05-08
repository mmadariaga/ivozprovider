import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

// Change this to be your own login check route.
const login_uri = 'https://10.10.3.21/api/platform/admin_login';


interface AuthProviderparamsInterface {
    username: string,
    password: string,
    status: number
}

export default (type: string, params: AuthProviderparamsInterface) => {

    switch (type) {
        case AUTH_LOGIN:
            const { username, password } = params;

            let formArr = [];
            formArr.push(['username', "=", encodeURIComponent(username).replace(/%20/g,"+")].join(""));
            formArr.push(['password', "=", encodeURIComponent(password).replace(/%20/g,"+")].join(""));

            const request = new Request(`${login_uri}`, {
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
                    localStorage.setItem('token', token); // The JWT token is stored in the browser's local storage
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

