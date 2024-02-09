import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '../flex';
import { Thing } from '../models';

@Component({
    standalone: true,
    selector: 'thing-card',
    templateUrl: 'thing-card.component.html',
    imports: [
        MatButtonModule,
        FlexModule
    ]
})
export class ThingCardComponent {
    @Input({ required: true }) thing!: Thing;
    @Output() edit = new EventEmitter<Thing>();
    @Output() remove = new EventEmitter<Thing>();
}
