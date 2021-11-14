import { Injectable } from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Gerencia } from '../../../../../../api/model/gerencia';
import { GerenciasService } from './gerencias.service';

@Injectable({
    providedIn: 'root',
})
export class GerenciasResolver implements Resolve<any> {
    constructor(private _gerenciasService: GerenciasService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Gerencia[]> {
        console.log('llamo resolver');
        return this._gerenciasService.getGerencias();
    }
}
