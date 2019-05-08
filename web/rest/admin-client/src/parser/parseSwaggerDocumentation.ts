import handleJson from "./handleJson";

export default function parseSwaggerDocumentation(entrypointUrl: string, specOverwrite:any = {}) {

  return fetch(entrypointUrl + 'docs.json')
    .then(res => {
        return res.json();
    })
    .then(
      response => {

        const api = handleJson(response, specOverwrite);

        return Promise.resolve({
          api,
          response
        });
      },
      ({ response }) => {

        return Promise.reject({
          //api: new Api(entrypointUrl, { resources: [] }),
          response,
          status: response.status
        })
      }
    );
}
