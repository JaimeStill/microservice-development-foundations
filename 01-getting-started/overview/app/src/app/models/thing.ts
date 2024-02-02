import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

export interface Thing {
    id: number;
    name: string;
    description: string;
}

export function GenerateThingForm(thing: Thing, fb: FormBuilder): FormGroup {
    return fb.group({
        id: [thing.id],
        name: [
            thing.name ?? '',
            Validators.required
        ],
        description: [thing.description]
    });
}
