import { Component } from '@angular/core';
import { ThingListComponent } from '../components';

@Component({
    selector: 'home-route',
    standalone: true,
    templateUrl: 'home.route.html',
    imports: [ ThingListComponent ]
})
export class HomeRoute { }
