
import React, {Fragment, cloneElement} from 'react';
import { Datagrid, ShowButton, EditButton } from 'react-admin';
import ActionFactory from '../../action/ActionFactory';

const ButtonGroup = (props: any) => {
    return (
        <Fragment>
            {props.children.filter((_: any) => _).map((child: any) => React.cloneElement(child, props) )}
        </Fragment>
    );
}

const TableGrid = (props: any) => {

    const {
        resourceSpec,
        ...rest
    } = props;

    return (
        <Datagrid {...rest}>
            {props.fields.map((field:any) => cloneElement(field, {record: props.record}))}
            <ButtonGroup>
                {!resourceSpec.edit && resourceSpec.show && <ShowButton key="show" label="" />}
                {resourceSpec.edit && <EditButton key="edit" label=""  />}
            </ButtonGroup>
            <ButtonGroup>
                {resourceSpec.list.actions.map((action: any, key: number) => ActionFactory({action, ...props}, key))}
            </ButtonGroup>
        </Datagrid>
    );

}

export default TableGrid;