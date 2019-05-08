import React, {Component} from 'react';
import AdminBuilder from './AdminBuilder';
import Api from '../model/Api';

interface AdminLoaderProps {
  entrypoint: string,
  title: string,
  resources: any[],
  apiDocumentationParser: (entrypoint:string) => Promise<any>,
  authProvider: any,
  theme: any,
  dataProvider: (api:Api) => any,
  loading: () => string | any,
  error: () => string | any
}

interface AdminLoaderState {
  api: Api | null,
  hasError: boolean,
  loaded: boolean
}

export default class extends Component<AdminLoaderProps, AdminLoaderState>{
  static defaultProps = {
    error: 'Unable to retrieve API documentation.',
    loading: 'Loading...',
    resources: []
  };

  state: AdminLoaderState = {
    api: null,
    hasError: false,
    loaded: false,
  };

  componentDidMount() {
    this.props
      .apiDocumentationParser(this.props.entrypoint)
      .then(
        ({api}) => ({
          api,
          hasError: false,
          loaded: true,
        }),
        data => {
          if (data instanceof Error) {
            console.error(data);

            return {
              api: null,
              hasError: true,
              loaded: true,
            };
          }

          return {
            api: data.api,
            hasError: true,
            loaded: true,
          };
        },
      )
      .then(this.setState.bind(this));
  }

  render() {

    if (false === this.state.loaded) {
      return 'function' === typeof this.props.loading ? (
        <this.props.loading />
      ) : (
        <span className="loading">{this.props.loading}</span>
      );
    }

    if (true === this.state.hasError) {
      return 'function' === typeof this.props.error ? (
        <this.props.error />
      ) : (
        <span className="error">{this.props.error}</span>
      );
    }

    if (!this.state.api) {
      console.error("Unable to get API definition");
      debugger;
    }

    return (
      <AdminBuilder
        {...this.props}
        api={(this.state.api as Api)}
        dataProvider={this.props.dataProvider(this.state.api as Api)}
      />
    );
  }
}
