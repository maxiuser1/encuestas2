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
