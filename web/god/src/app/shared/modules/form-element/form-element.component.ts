import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentFactory,
    ComponentRef
} from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';
import Property from '@app/shared/models/Property';

import * as Implementations from './implementations/index';
import Item from '@shared/modules/entity//crud/models/Item';

@Component({
    selector: 'app-form-element',
    template: `<template #formElement></template>`,
    entryComponents: [
        Implementations.TextElementComponent,
        Implementations.BooleanElementComponent,
        Implementations.EntityElementComponent
    ],
})
export class FormElementComponent implements OnInit {

    @ViewChild("formElement", { read: ViewContainerRef }) container;

    @Input() property: Property;
    @Input() item: Item;
    @Input() form: FormGroup;

    private componentRef: ComponentRef<any>;

    constructor(private resolver: ComponentFactoryResolver) {}

    public ngOnInit() {
        this.initFormElement();
    }

    ngOnDestroy() {
        this.componentRef.destroy();
    }

    private initFormElement() {

        this.container.clear();
        const implementation = this.getFormElementImplementation();
        const factory: ComponentFactory<any> = this.resolver
            .resolveComponentFactory(implementation);

        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.property = this.property;
        this.componentRef.instance.form = this.form;
    }

    private getFormElementImplementation() {

        let type;
        switch(this.property.type) {
            case 'integer':
            case 'string':
                type = 'Text';
                break;
            case 'boolean':
                type = 'Boolean';
                break;
            default:
                type = this.property.type.indexOf('_') > 0
                    ? 'Text'
                    : 'Entity';
        }

        const component = `${type}ElementComponent`;
        if (!Implementations[component]) {
            throw Error(`Unkown component ${component}`)
        }

        return Implementations[component];
    }
}
