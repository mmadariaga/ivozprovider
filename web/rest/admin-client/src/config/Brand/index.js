import Dns from '@material-ui/icons/Dns';

export default {
    "iden": "Brand",
    "name": "Brands",
    "icon": Dns,
    "properties": {},
    "recordToString": (record) => `${record.name}`,
    "list": {
        "actions": [
            {
                "type": "link",
                "entity": "Administrator",
                "filterField": "brand"
            },
            {
                "type": "link",
                "entity": "WebPortal",
                "filterField": "brand"
            }
        ]
    }
};