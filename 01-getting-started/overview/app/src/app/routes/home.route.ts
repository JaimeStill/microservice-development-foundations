import { Component } from '@angular/core';
import { FlexModule } from '../flex';

@Component({
    selector: 'home-route',
    standalone: true,
    templateUrl: 'home.route.html',
    styleUrl: 'home.route.scss',
    imports: [
        FlexModule
    ]
})
export class HomeRoute {}
