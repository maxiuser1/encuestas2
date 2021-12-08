import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Encuesta } from '../../../../../../api/model/encuesta';
import { Campana } from '../../../../../../api/model/gerencia';

@Injectable({
    providedIn: 'root',
})
export class CampanasService {
    private _encuestas: BehaviorSubject<Encuesta[] | null> =
        new BehaviorSubject(null);

    private _campana: BehaviorSubject<Campana | null> = new BehaviorSubject(
        null
    );

    private _campanas: BehaviorSubject<Campana[] | null> = new BehaviorSubject(
        null
    );

    get encuestas$(): Observable<Encuesta[]> {
        return this._encuestas.asObservable();
    }

    get campana$(): Observable<Campana> {
        return this._campana.asObservable();
    }

    get campanas$(): Observable<Campana[]> {
        return this._campanas.asObservable();
    }

    constructor(private _httpClient: HttpClient) {}

    getEncuestas(): Observable<Encuesta[]> {
        return this._httpClient.get<Encuesta[]>('api/private/encuestas').pipe(
            tap((gerencias) => {
                this._encuestas.next(gerencias);
            })
        );
    }

    getCampanas(): Observable<Campana[]> {
        return this._httpClient.get<Campana[]>('api/private/campanas').pipe(
            tap((gerencias) => {
                this._campanas.next(gerencias);
            })
        );
    }

    getCampana(id: string): Observable<Campana> {
        return this._campanas.pipe(
            take(1),
            map((campanas) => {
                const campana =
                    campanas.find((value) => value.id === id) || null;
                this._campana.next(campana);
                return campana;
            })
        );
    }

    createCampana(campana: Campana): Observable<Campana> {
        return this.campanas$.pipe(
            take(1),
            switchMap((campanas) =>
                this._httpClient
                    .post<Campana>('api/private/campanas', campana)
                    .pipe(
                        map((newCampana) => {
                            this._campana.next(newCampana);
                            this._campanas.next([...campanas, newCampana]);
                            return newCampana;
                        })
                    )
            )
        );
    }

    updateCampana(campana: Campana): Observable<Campana> {
        if (campana.id) {
            return this.campanas$.pipe(
                take(1),
                switchMap((campanas) =>
                    this._httpClient
                        .put<Campana>(
                            `api/private/campanas/${campana.id}`,
                            campana
                        )
                        .pipe(
                            map((updatedCampana) => {
                                const index = campanas.findIndex(
                                    (item) => item.id == campana.id
                                );
                                campanas[index] = updatedCampana;

                                this._campanas.next(campanas);
                                return updatedCampana;
                            })
                        )
                )
            );
        } else {
            return of(campana);
        }
    }

    definirEvaluadores(campana: Campana) {
        return this._httpClient.post('api/private/initRespuestas', campana);
    }
}
