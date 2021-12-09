import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Encuesta } from '../../../../../../api/model/encuesta';
import { Campana } from '../../../../../../api/model/gerencia';
import { CampanasService } from './campanas.service';
import { RespuestasService } from './respuestas.service';

@Injectable({
    providedIn: 'root',
})
export class ReportesResolver implements Resolve<any> {
    constructor(private _campanasService: CampanasService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Campana[]> {
        return this._campanasService.getCampanas();
    }
}

@Injectable({
    providedIn: 'root',
})
export class ReportesRespuestasResolver implements Resolve<any> {
    constructor(private _respuestasService: RespuestasService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Encuesta[]> {
        return this._respuestasService.getRespuestas(route.params['id']);
    }
}
