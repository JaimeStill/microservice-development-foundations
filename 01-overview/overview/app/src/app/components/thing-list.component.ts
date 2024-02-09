import {
    Component,
    OnInit
} from '@angular/core';

import {
    MatDialog,
    MatDialogModule
} from '@angular/material/dialog';

import {
    ConfirmDialog,
    SnackerService
} from '../core';

import { MatButtonModule } from '@angular/material/button';
import { ThingCardComponent } from './thing-card.component';
import { ThingDialog } from '../dialogs';
import { FlexModule } from '../flex';
import { ThingService } from '../services';
import { Thing } from '../models';

@Component({
    standalone: true,
    selector: 'thing-list',
    templateUrl: 'thing-list.component.html',
    providers: [
        SnackerService,
        ThingService
    ],
    imports: [
        FlexModule,
        MatButtonModule,
        MatDialogModule,
        ThingCardComponent
    ]
})
export class ThingListComponent implements OnInit {
    things: Thing[] | null = null;

    constructor(
        private dialog: MatDialog,
        private snacker: SnackerService,
        private thingSvc: ThingService
    ) { }

    private async refresh() {
        this.things = await this.thingSvc.getThings();
    }

    async ngOnInit(): Promise<void> {
        await this.refresh();
    }

    private openThingDialog(thing: Thing) {
        this.dialog.open(ThingDialog, {
            disableClose: true,
            data: thing,
            width: '90%',
            maxWidth: '600px'
        })
        .afterClosed()
        .subscribe(async (result: Thing | null) => {
            if (result) {
                this.snacker.sendSuccessMessage(`Thing ${result.name} successfully saved`);
                this.refresh();
            }
        });
    }

    add() {
        this.openThingDialog(<Thing>{
            id: 0,
            name: '',
            description: ''
        });
    }

    edit(thing: Thing) {
        this.openThingDialog(thing);
    }

    remove(thing: Thing) {
        this.dialog.open(ConfirmDialog, {
            disableClose: true,
            autoFocus: false,
            data: {
                title: `Remove Thing`,
                content: `Are you sure you want to remove Thing "${thing.name}"?`
            }
        })
        .afterClosed()
        .subscribe(async (result: boolean) => {
            if (result) {
                const res = await this.thingSvc.remove(thing.id);

                if (res) {
                    this.snacker.sendSuccessMessage(`Thing ${thing.name} successfully removed`);
                    this.refresh();
                }
            }
        });
    }
}
