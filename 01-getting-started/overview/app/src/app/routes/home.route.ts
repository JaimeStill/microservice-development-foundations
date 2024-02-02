import {
    Component,
    OnInit
} from '@angular/core';

import { ThingService } from '../services';
import { Thing } from '../models';

@Component({
    selector: 'home-route',
    standalone: true,
    templateUrl: 'home.route.html',
    styleUrl: 'home.route.scss',
    providers: [
        ThingService
    ]
})
export class HomeRoute implements OnInit {
    things: Thing[] = [];

    constructor(
        private thingSvc: ThingService
    ) { }

    async ngOnInit(): Promise<void> {
        this.things = await this.thingSvc.getThings();
    }
}
