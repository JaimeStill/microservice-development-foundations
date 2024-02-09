import {
    Component,
    Inject,
    OnInit
} from '@angular/core';

import {
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { ThingForm } from '../forms';
import { Thing } from '../models';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'thing-dialog',
    standalone: true,
    templateUrl: 'thing.dialog.html',
    imports: [
        MatButtonModule,
        MatDialogModule,
        ThingForm
    ]
})
export class ThingDialog implements OnInit {
    constructor(
        private dialog: MatDialogRef<ThingDialog>,
        @Inject(MAT_DIALOG_DATA) public thing: Thing
    ) { }

    ngOnInit(): void {
        if (!this.thing)
            this.dialog.close();
    }

    saved = (thing: Thing) => this.dialog.close(thing);
}
