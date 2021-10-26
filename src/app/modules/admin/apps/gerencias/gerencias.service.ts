import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { Gerencia } from '../../../../../../api/model/gerencia';

@Injectable({
    providedIn: 'root',
})
export class GerenciasService {
    private _gerencia: BehaviorSubject<Gerencia | null> = new BehaviorSubject(
        null
    );
    private _gerencias: BehaviorSubject<Gerencia[] | null> =
        new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) {}

    get gerencia$(): Observable<Gerencia> {
        return this._gerencia.asObservable();
    }

    get gerencias$(): Observable<Gerencia[]> {
        return this._gerencias.asObservable();
    }

    getGerencias(): Observable<Gerencia[]> {
        return this._httpClient.get<Gerencia[]>('api/private/gerencias').pipe(
            tap((gerencias) => {
                this._gerencias.next(gerencias);
            })
        );
    }
}
