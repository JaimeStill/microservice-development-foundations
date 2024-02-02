import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Thing } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ThingService {
    private api: string = `${environment.server}thing/`;

    constructor(
        private http: HttpClient
    ) { }

    getThings(): Signal<Thing[] | undefined> {
        return toSignal(
            this.http.get<Thing[]>(
                `${this.api}getThings`
            )
        );
    }

    getThing(id: number): Signal<Thing | undefined> {
        return toSignal(
            this.http.get<Thing>(
                `${this.api}getThing/${id}`
            )
        );
    }

    validateName(thing: Thing): Signal<boolean | undefined> {
        return toSignal(
            this.http.post<boolean>(
                `${this.api}validateName`,
                thing
            )
        );
    }

    validate(thing: Thing): Signal<boolean | undefined> {
        return toSignal(
            this.http.post<boolean>(
                `${this.api}validate`,
                thing
            )
        );
    }

    save(thing: Thing): Signal<Thing | undefined> {
        return toSignal(
            this.http.post<Thing>(
                `${this.api}save`,
                thing
            )
        );
    }

    remove(thing: Thing): Signal<number | undefined> {
        return toSignal(
            this.http.delete<number>(
                `${this.api}remove`,
                { body: thing }
            )
        );
    }
}
