import { Injectable } from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Encuesta } from '../../../../../../api/model/encuesta';
import { EncuestasService } from './encuestas.service';

@Injectable({
    providedIn: 'root',
})
export class EncuestasResolver implements Resolve<any> {
    constructor(private _encuestasService: EncuestasService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Encuesta[]> {
        return this._encuestasService.getEncuestas();
    }
}
