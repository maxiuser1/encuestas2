import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'lodash';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { getGuid } from '../../../../../../../api/common/Utils';
import { Campana } from '../../../../../../../api/model/gerencia';
import { CampanasAgregarComponent } from '../agregar/agregar.component';
import { CampanasEncuestasResolver } from '../campanas.resolver';
import { CampanasService } from '../campanas.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampanasListComponent implements OnInit {
    campanas$: Observable<Campana[]>;

    filters: {
        query$: BehaviorSubject<string>;
    } = {
        query$: new BehaviorSubject(''),
    };

    campaniaChanged: Subject<Campana> = new Subject<Campana>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _campanasService: CampanasService
    ) {}

    ngOnInit(): void {
        this.campanas$ = combineLatest([
            this._campanasService.campanas$,
            this.filters.query$,
        ]).pipe(
            distinctUntilChanged(),
            map(([campanas, query]) => {
                if (!campanas || !campanas.length) {
                    return;
                }
                let filteredCampanas = campanas;
                return filteredCampanas;
            })
        );
    }

    filtrarPorNombre(query: string): void {
        this.filters.query$.next(query);
    }

    agregarCampana(): void {
        const dialogRef = this._matDialog.open(CampanasAgregarComponent, {
            autoFocus: false,
            data: {
                titulo: 'Nueva Campaña',
            },
        });

        dialogRef.afterClosed().subscribe((result: Campana) => {
            if (!result) return;

            result.id = getGuid();
            result.estado = 1;

            this._campanasService.createCampana(result).subscribe((t) => {
                this._changeDetectorRef.markForCheck();
            });
        });
    }

    continuarCampana(campana: Campana) {
        if (campana.estado == 1) {
            this._campanasService.definirEvaluadores(campana).subscribe((t) => {
                campana.estado = 2;
                this._campanasService.updateCampana(campana).subscribe();
            });
        } else if (campana.estado == 2) {
            this._campanasService
                .despacharRespuestas(campana)
                .subscribe((t) => {
                    campana.estado = 3;
                    this._campanasService.updateCampana(campana).subscribe();
                });
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
