import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Thing } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ThingService {
    private api: string = `${environment.server}thing/`;

    constructor(
        private http: HttpClient
    ) { }

    getThings(): Promise<Thing[]> {
        return firstValueFrom(
            this.http.get<Thing[]>(
                `${this.api}getThings`
            )
        );
    }

    getThing(id: number): Promise<Thing> {
        return firstValueFrom(
            this.http.get<Thing>(
                `${this.api}getThing/${id}`
            )
        );
    }

    validateName(thing: Thing): Promise<boolean> {
        return firstValueFrom(
            this.http.post<boolean>(
                `${this.api}validateName`,
                thing
            )
        );
    }

    validate(thing: Thing): Promise<boolean> {
        return firstValueFrom(
            this.http.post<boolean>(
                `${this.api}validate`,
                thing
            )
        );
    }

    save(thing: Thing): Promise<Thing> {
        return firstValueFrom(
            this.http.post<Thing>(
                `${this.api}save`,
                thing
            )
        );
    }

    remove(thing: Thing): Promise<number> {
        return firstValueFrom(
            this.http.delete<number>(
                `${this.api}remove`,
                { body: thing }
            )
        );
    }
}
