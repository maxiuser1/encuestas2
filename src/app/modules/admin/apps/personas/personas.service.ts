import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
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

    getPersona(id: string): Observable<Persona> {
        return this._personas.pipe(
            take(1),
            map((personas) => {
                const persona = personas.find((t) => t.id == id) || null;
                this._persona.next(persona);
                return persona;
            })
        );
    }

    createPersona(persona: Persona): Observable<Persona> {
        return this.personas$.pipe(
            take(1),
            switchMap((personas) =>
                this._httpClient
                    .post<Persona>('api/private/personas', persona)
                    .pipe(
                        map((newPersona) => {
                            this._persona.next(newPersona);
                            this._personas.next([...personas, newPersona]);

                            return newPersona;
                        })
                    )
            )
        );
    }

    updatePersona(persona: Persona): Observable<Persona> {
        return this.personas$.pipe(
            take(1),
            switchMap((personas) =>
                this._httpClient
                    .put<Persona>(`api/private/personas/${persona.id}`, persona)
                    .pipe(
                        map((updatePersona) => {
                            const index = personas.findIndex(
                                (item) => item.id == persona.id
                            );
                            personas[index] = updatePersona;
                            this._personas.next(personas);
                            return updatePersona;
                        })
                    )
            )
        );
    }
}
