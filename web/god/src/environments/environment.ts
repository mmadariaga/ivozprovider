// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

<<<<<<< HEAD
const API_URL = 'https://10.10.3.21';
=======
const API_URL = 'https://10.10.3.21/api/platform';
>>>>>>> b024c9a7a... fixup web admin

export const environment = {
  production: false,
  login: {
    url: `${API_URL}/god-api/admin_login`
  }
};
