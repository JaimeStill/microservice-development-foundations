import {
    Component,
    OnInit,
    Inject
} from '@angular/core';

import {
    MAT_DIALOG_DATA,
    MatDialogModule
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'confirm-dialog',
    standalone: true,
    templateUrl: 'confirm.dialog.html',
    imports: [
        MatButtonModule,
        MatDialogModule
    ]
})
export class ConfirmDialog implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }
    ) { }

    ngOnInit() {
        if (this.data) {
            this.data.title = this.data.title
                ? this.data.title
                : 'Confirm Action?';

            this.data.content = this.data.content
                ? this.data.content
                : 'Are you sure you would like to perform this action?';
        } else {
            this.data = {
                title: 'Confirm Action?',
                content: 'Are you sure you would like to perform this action?'
            };
        }
    }
}
