import { Injectable } from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Encuesta } from '../../../../../../api/model/encuesta';
import { Campana } from '../../../../../../api/model/gerencia';
import { EncuestasService } from '../encuestas/encuestas.service';
import { CampanasService } from './campanas.service';
import { RespuestasService } from './respuestas.service';

@Injectable({
    providedIn: 'root',
})
export class CampanasResolver implements Resolve<any> {
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
export class CampanasEncuestasResolver implements Resolve<any> {
    constructor(private _campanasService: CampanasService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Encuesta[]> {
        return this._campanasService.getEncuestas();
    }
}

@Injectable({
    providedIn: 'root',
})
export class CampanasRespuestasResolver implements Resolve<any> {
    constructor(private _respuestasService: RespuestasService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Encuesta[]> {
        console.log('llamo resolver', route.params['id']);
        return this._respuestasService.getRespuestas(route.params['id']);
    }
}
