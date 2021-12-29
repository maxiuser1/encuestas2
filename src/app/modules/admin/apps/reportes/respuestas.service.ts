import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Respuesta } from '../../../../../../api/model/gerencia';

@Injectable({
    providedIn: 'root',
})
export class RespuestasService {
    private _respuestas: BehaviorSubject<Respuesta[] | null> =
        new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) {}

    get respuestas$(): Observable<Respuesta[]> {
        return this._respuestas.asObservable();
    }

    getRespuestas(id: string): Observable<Respuesta[]> {
        return this._httpClient
            .get<Respuesta[]>(`api/private/campanas/${id}/reporte`)
            .pipe(
                tap((respuestas) => {
                    this._respuestas.next(respuestas);
                })
            );
    }

    getRespuestasCsv(id: string): Observable<Respuesta[]> {
        return this._httpClient.get<Respuesta[]>(
            `api/private/campanas/${id}/csv`
        );
    }
}
