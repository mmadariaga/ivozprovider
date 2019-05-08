import React, {cloneElement} from 'react';
import { ShowButton, EditButton } from 'react-admin';
import { Card, CardActions, CardHeader, CardContent, StyleRulesCallback } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ActionFactory from '../../action/ActionFactory';

const MobileCardContent = (props: any) => {

    const {
        classes,
        resourceSpec,
        fields,
        ids,
        data,
        total,
        isLoading,
        loadedOnce,
    } = props;

    /**
     * if loadedOnce is false, the list displays for the first time, and the dataProvider hasn't answered yet
     * if loadedOnce is true, the data for the list has at least been returned once by the dataProvider
     * if loadedOnce is undefined, the Datagrid parent doesn't track loading state (e.g. ReferenceArrayField)
     */
    if (loadedOnce === false) {
        return null;
    }

    /**
     * Once loaded, the data for the list may be empty. Instead of
     * displaying the table header with zero data rows,
     * the datagrid displays nothing in this case.
     */
    if (!isLoading && (ids.length === 0 || total === 0)) {
        return null;
    }

    return ids.map((id:any) => {

        const record = data[id];

        return (
            <Card key={id}>
                <CardHeader
                    title={
                        <div className={classes.cardTitleContent}>
                            <span>
                                {resourceSpec.name}:&nbsp;
                                {data[id].id}
                            </span>
                        </div>
                    }
                />
                <CardContent className={classes.cardContent}>
                    {fields.map((field:any) => cloneElement(field, {record}))}
                </CardContent>
                <CardActions>
                    {!resourceSpec.edit && resourceSpec.show && <ShowButton key="show" label="" record={record} basePath={props.basePath} />}
                    {resourceSpec.edit && <EditButton key="edit" label="" record={record} basePath={props.basePath} />}
                    {resourceSpec.list.actions.map((action: any, key: number) => ActionFactory({action, record, ...props}, key))}
                </CardActions>
            </Card>
        );
    });
};

const cardStyles : StyleRulesCallback = (theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0.5rem 0',
    },
    cardTitleContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardContent: theme.typography.body1,
    cardContentRow: {
        display: 'flex',
        alignItems: 'center',
        margin: '0.5rem 0',
    },
});

const MobileGrid = withStyles(cardStyles)(MobileCardContent);

export default MobileGrid;