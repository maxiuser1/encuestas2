import { HttpClient } from '@angular/common/http';
import { Injectable, KeyValueDiffers } from '@angular/core';
import { items } from 'app/mock-api/apps/file-manager/data';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { map, switchMap, take } from 'rxjs/operators';
import { Gerencia, Persona } from '../../../../../../api/model/gerencia';

@Injectable({
    providedIn: 'root',
})
export class GerenciasService {
    private _personas: BehaviorSubject<Persona[] | null> = new BehaviorSubject(
        null
    );

    private _gerencia: BehaviorSubject<Gerencia | null> = new BehaviorSubject(
        null
    );
    private _gerencias: BehaviorSubject<Gerencia[] | null> =
        new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) {}

    get personas$(): Observable<Persona[]> {
        return this._personas.asObservable();
    }

    get gerencia$(): Observable<Gerencia> {
        return this._gerencia.asObservable();
    }

    get gerencias$(): Observable<Gerencia[]> {
        return this._gerencias.asObservable();
    }

    getPersonas(): Observable<Persona[]> {
        return this._httpClient.get<Persona[]>('api/private/personas').pipe(
            tap((personas) => {
                this._personas.next(personas);
            })
        );
    }

    getGerencias(): Observable<Gerencia[]> {
        return this._httpClient.get<Gerencia[]>('api/private/gerencias').pipe(
            tap((gerencias) => {
                console.log('tap', gerencias);
                this._gerencias.next(gerencias);
            })
        );
    }

    getGerencia(id: string): Observable<Gerencia> {
        return this._gerencias.pipe(
            take(1),
            map((gerencias) => {
                const gerencia =
                    gerencias.find((value) => value.id === id) || null;
                this._gerencia.next(gerencia);
                return gerencia;
            })
        );
    }

    updateGerencia(gerencia: Gerencia): Observable<Gerencia> {
        console.log('update geren', gerencia);
        if (gerencia.id) {
            return this.gerencias$.pipe(
                take(1),
                switchMap((gerencias) =>
                    this._httpClient
                        .put<Gerencia>(
                            `api/private/gerencias/${gerencia.id}`,
                            gerencia
                        )
                        .pipe(
                            map((updatedGerencia) => {
                                const index = gerencias.findIndex(
                                    (item) => item.id == gerencia.id
                                );
                                gerencias[index] = updatedGerencia;

                                this._gerencias.next(gerencias);
                                return updatedGerencia;
                            })
                        )
                )
            );
        } else {
            return of(gerencia);
        }
    }

    createGerencia(gerencia: Gerencia): Observable<Gerencia> {
        return this.gerencias$.pipe(
            take(1),
            switchMap((gerencias) =>
                this._httpClient
                    .post<Gerencia>('api/private/gerencias', gerencia)
                    .pipe(
                        map((newGerencia) => {
                            this._gerencia.next(newGerencia);
                            this._gerencias.next([...gerencias, newGerencia]);

                            return newGerencia;
                        })
                    )
            )
        );
    }
}
