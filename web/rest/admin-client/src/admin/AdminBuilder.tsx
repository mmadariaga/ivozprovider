import Api from '../model/Api';
import {Admin, Resource, resolveBrowserLocale} from 'react-admin';
import React from 'react';

import ListFactory from './factory/ListFactory';
import ShowFactory from './factory/ShowFactory';
import CreateFactory from './factory/CreateFactory';
import EditFactory from './factory/EditFactory';

import englishMessages from 'ra-language-english';
import domainEnglishMessages from '../i18n/english';
import spanishMessages from 'aor-language-spanish';
import domainSpanishMessages from '../i18n/spanish';
import catalanMessages from 'ra-language-catalan'
import domainCatalanMessages from '../i18n/catalan';

var merge = require('lodash.merge');

interface AdminBuilderPropsInterface {
  api: Api,
  dataProvider: any,
  authProvider: any,
  resources: Array<any>,
  theme: any,
  title: string
}

const AdminBuilder = (props: AdminBuilderPropsInterface) => {

  const {
    api,
    dataProvider,
    authProvider,
    theme,
  } = props;

  const {
    info: {title},
    resources
  } = api;

  const referableResources = resources.map(resource => resource.name);

  const messages: { [key: string]: any; } = {
      es: {...spanishMessages, ...domainSpanishMessages},
      en: {...englishMessages, ...domainEnglishMessages},
      // Comunity suported languages
      ca: merge(catalanMessages, domainSpanishMessages, domainCatalanMessages),
  };
  const i18nProvider = (locale: string) => messages[locale];

  return (
    <Admin
      theme={theme}
      dataProvider={dataProvider}
      authProvider={authProvider}
      locale={resolveBrowserLocale()}
      //locale="en"
      i18nProvider={i18nProvider}
      title={title}
    >
        {resources.map((resource, i) => {

            const list = ListFactory(resource, referableResources, resources);
            const create = CreateFactory(resource, referableResources);
            const edit = EditFactory(resource, referableResources);
            const show = ShowFactory(resource, referableResources);

            return (
                <Resource
                  key={i}
                  name={resource.name}
                  list={list}
                  show={show}
                  create={create}
                  edit={edit}
                  icon={resource.icon}
                />
            )
        })}
    </Admin>
  );
};

//AdminBuilder.defaultProps = {
//};
//
//AdminBuilder.propTypes = {
//  //api: PropTypes.instanceOf(Api).isRequired,
//  //dataProvider: PropTypes.func.isRequired,
//  //resource: PropTypes.array,
//};

export default AdminBuilder;
