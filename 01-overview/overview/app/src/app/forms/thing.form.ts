import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';

import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule
} from '@angular/forms';

import {
    GenerateThingForm,
    Thing
} from '../models';

import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiValidator } from '../core';
import { FlexModule } from '../flex';
import { ThingService } from '../services';

@Component({
    selector: 'thing-form',
    standalone: true,
    templateUrl: 'thing.form.html',
    imports: [
        CommonModule,
        FlexModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        TextFieldModule
    ],
    providers: [
        ApiValidator,
        FormBuilder,
        ThingService
    ]
})
export class ThingForm implements OnChanges {
    form!: FormGroup;
    get name() { return this.form.get('name') }

    @Input({ required: true }) thing!: Thing;
    @Output() saved = new EventEmitter<Thing>();

    constructor(
        private fb: FormBuilder,
        private thingSvc: ThingService,
        private validator: ApiValidator,
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['thing']) {
            this.form = GenerateThingForm(this.thing, this.fb);

            this.validator.registerValidator(
                this.thingSvc.validateName,
                this.form,
                this.name!
            );
        }
    }

    async save(): Promise<void> {
        if (this.form.valid) {
            const res = await this.thingSvc.save(this.form.value);

            if (res)
                this.saved.emit(res);
        }
    }
}
