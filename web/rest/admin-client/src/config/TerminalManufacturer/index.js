import PhonelinkSetup from '@material-ui/icons/PhonelinkSetup';

export default {
    "iden": "TerminalManufacturer",
    "name": "Terminal Manufacturers",
    "icon": PhonelinkSetup,
    "list": {
        "actions": [
            {
                "type": "link",
                "entity": "TerminalModel",
                "filterField": "terminalManufacturer"
            }
        ]
    }
};