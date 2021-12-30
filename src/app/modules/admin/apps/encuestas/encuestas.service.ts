import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { update } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Encuesta } from '../../../../../../api/model/encuesta';

@Injectable({
    providedIn: 'root',
})
export class EncuestasService {
    private _encuesta: BehaviorSubject<Encuesta | null> = new BehaviorSubject(
        null
    );

    private _encuestas: BehaviorSubject<Encuesta[] | null> =
        new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) {}

    get encuesta$(): Observable<Encuesta> {
        return this._encuesta.asObservable();
    }

    get encuestas$(): Observable<Encuesta[]> {
        return this._encuestas.asObservable();
    }

    getEncuestas(): Observable<Encuesta[]> {
        return this._httpClient.get<Encuesta[]>('api/private/encuestas').pipe(
            tap((gerencias) => {
                this._encuestas.next(gerencias);
            })
        );
    }

    createEncuesta(encuesta: Encuesta): Observable<Encuesta> {
        return this.encuestas$.pipe(
            take(1),
            switchMap((encuestas) =>
                this._httpClient
                    .post<Encuesta>('api/private/encuestas', encuesta)
                    .pipe(
                        map((newEncuesta) => {
                            this._encuesta.next(newEncuesta);
                            this._encuestas.next([...encuestas, newEncuesta]);
                            return newEncuesta;
                        })
                    )
            )
        );
    }

    updateEncuesta(encuesta: Encuesta): Observable<Encuesta> {
        return this.encuestas$.pipe(
            take(1),
            switchMap((encuestas) =>
                this._httpClient
                    .put<Encuesta>(
                        `api/private/encuestas/${encuesta.id}`,
                        encuesta
                    )
                    .pipe(
                        map((updatedEncuesta) => {
                            const index = encuestas.findIndex(
                                (item) => item.id == encuesta.id
                            );
                            encuestas[index] = updatedEncuesta;

                            this._encuestas.next(encuestas);

                            return updatedEncuesta;
                        })
                    )
            )
        );
    }
}
