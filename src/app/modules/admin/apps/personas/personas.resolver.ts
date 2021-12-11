import { Injectable } from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Persona } from '../../../../../../api/model/gerencia';
import { PersonasService } from './personas.service';

@Injectable({
    providedIn: 'root',
})
export class PersonasResolver implements Resolve<any> {
    constructor(private _personaService: PersonasService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Persona[]> {
        return this._personaService.getPersonas();
    }
}
