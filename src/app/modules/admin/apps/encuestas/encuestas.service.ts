import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
}
