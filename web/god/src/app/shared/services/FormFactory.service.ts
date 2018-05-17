import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Property from '@shared/models/Property';
import { Injectable } from '@angular/core';

@Injectable()
export class FormFactoryService
{
    constructor(
        private formBuilder: FormBuilder,
    ) {}

    fromProperties(properties: Property[]): FormGroup {

        let definitions = {};
        for (const property of properties) {

            let validators = null;
            if (property.required) {
                validators =  Validators.compose([Validators.required]);
            }

            definitions[property.name] = [
                property.default,
                validators
            ];
        }

        return this.formBuilder.group(definitions);
    }
}