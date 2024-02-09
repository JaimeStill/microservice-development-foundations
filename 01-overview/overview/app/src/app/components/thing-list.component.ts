import {
    Component,
    OnInit
} from '@angular/core';

import { ThingCardComponent } from './thing-card.component';
import { FlexModule } from '../flex';
import { ThingService } from '../services';
import { Thing } from '../models';

@Component({
    standalone: true,
    selector: 'thing-list',
    templateUrl: 'thing-list.component.html',
    providers: [ ThingService ],
    imports: [
        FlexModule,
        ThingCardComponent
    ]
})
export class ThingListComponent implements OnInit {
    things: Thing[] | null = null;

    constructor(
        private thingSvc: ThingService
    ) { }

    async ngOnInit(): Promise<void> {
        this.things = await this.thingSvc.getThings();
    }

    edit(thing: Thing) {
        console.log('Edit Thing', thing);
    }

    remove(thing: Thing) {
        console.log('Remove Thing', thing);
    }
}
