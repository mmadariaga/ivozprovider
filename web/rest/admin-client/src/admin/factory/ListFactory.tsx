import React, {Fragment} from 'react';
import { List, Filter, TextInput, BulkDeleteButton, Responsive } from 'react-admin';

import MobileGrid from './grid/list/mobileGrid';
import TableGrid from './grid/list/tableGrid';
import Resource from '../../model/Resource';
import FieldFactory from './FieldFactory';

export default (resource: Resource, referableResources: Array<string>, resources: Array<Resource>) => {

    if (!resource.list) {
        return null;
    }

    const list: any = resource.list || ({} as any);

    const filterFields = Object.keys(list.filterFields).reduce(
        (acc: any, filterFld: string) => {

            const visibleFld = list.properties.includes(filterFld.split('.').shift())

            if (visibleFld) {
                acc[filterFld] = list.filterFields[filterFld];
            }

            return acc;
        },
        {}
    );

    const sortableFields = list.sortableFields || [];
    const properties = list.properties || [];

    const noBulkActions = !(resource.delete);

    const fields = properties
        .map(
            (field: string, key: number) => {
                const property = resource.properties[field];
                const sortable = sortableFields.includes(field)
                    ? true
                    : false;

                return FieldFactory({
                    key: key,
                    label: property.name,
                    spec:property,
                    sortable,
                    referableResources,
                    resources
                });
            }
        )
        .filter((fld: any) => fld);

    return (props: any) => {

        const {
            hasShow,
            hasEdit,
            hasList,
            ...rest
        } = props;

        const BulkActionButtons = (props: any) => {
            return (
                <Fragment>
                    {resource.delete &&
                        <BulkDeleteButton {...props} />
                    }
                </Fragment>
            );
        };

        return (
            <List
                {...props}
                bulkActionButtons={noBulkActions ? false : <BulkActionButtons />}
                filters={<ListFilterFactory fields={filterFields} />}
            >
                 <Responsive
                    small={
                        <MobileGrid resourceSpec={resource} resources={resources} fields={fields} {...rest} />
                    }
                    medium={
                        <TableGrid resourceSpec={resource} resources={resources} fields={fields} {...rest}  />
                    }
                />
            </List>
        );
    };
}

const ListFilterFactory = (props: any) => {

    const {fields, ...rest} = props;
    const fieldNames = Object.keys(fields);
    const filters: any[] = [];

    fieldNames.forEach(fieldName => {
        fields[fieldName].forEach((action: string) => {
            filters.push({
                fieldName,
                action
            });
        });
    });

    return (
      <Filter {...rest}>
        {fieldNames.length > 0 &&
          filters.map(filter => {
            return FilterFieldFactory({filter});
          })}
      </Filter>
    );
};

const FilterFieldFactory = (props: any) => {

    const {filter, ...rest} = props;
    const {fieldName, action} = filter;

    return (
        <TextInput
            key={`${fieldName}[${action}]`}
            label={`${fieldName}[${action}]`}
            source={fieldName}
            {...rest}
        />
    );
}
