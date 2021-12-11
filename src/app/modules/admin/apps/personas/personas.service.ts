import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Persona } from '../../../../../../api/model/gerencia';

@Injectable({
    providedIn: 'root',
})
export class PersonasService {
    private _persona: BehaviorSubject<Persona | null> = new BehaviorSubject(
        null
    );
    private _personas: BehaviorSubject<Persona[] | null> = new BehaviorSubject(
        null
    );

    constructor(private _httpClient: HttpClient) {}

    get persona$(): Observable<Persona> {
        return this._persona.asObservable();
    }

    get personas$(): Observable<Persona[]> {
        return this._personas.asObservable();
    }

    getPersonas(): Observable<Persona[]> {
        return this._httpClient.get<Persona[]>('api/private/personas').pipe(
            tap((personas) => {
                this._personas.next(personas);
            })
        );
    }
}
