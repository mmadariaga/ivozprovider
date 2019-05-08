import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { stringify } from 'query-string';
import { translate, ListButton } from 'react-admin';
import Resource from '../../../model/Resource';

const EntityLink = (props: any) => {

    const {
        classes,
        record,
        action,
        resources
    } = props;

    const targetResurce = resources.find((item: Resource) => (item.iden === action.entity));

    if (!targetResurce) {
        console.error(`Related entity ${action.entity} was not found`);
        return null;
    }

    const icon = <targetResurce.icon />;

    return (
        <ListButton
            size="small"
            color="primary"
            label=""
            icon={icon}
            to={{
                pathname: `/${targetResurce.name}`,
                search: stringify({
                    page: 1,
                    filter: JSON.stringify({ [action.filterField]: record.id }),
                })
            }}
            className={classes.link}
        />
    );
}

const styles = {
    icon: { paddingRight: '0.5em' },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
};

export default withStyles(styles)(translate(EntityLink));
