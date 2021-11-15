import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatDrawer } from '@angular/material/sidenav';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Gerencia } from '../../../../../../../api/model/gerencia';
import { GerenciasAreaComponent } from '../areas/areas.component';
import { GerenciasDetailsComponent } from '../details/details.component';
import { GerenciasService } from '../gerencias.service';
import { GerenciasServicioComponent } from '../servicios/servicios.component';
import { GerenciasSubgerenciaComponent } from '../subgerencias/subgerencias.component';

@Component({
    selector: 'gerencias-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasListComponent implements OnInit {
    gerencias$: Observable<Gerencia[]>;
    filters: {
        empresaSlug$: BehaviorSubject<string>;
        query$: BehaviorSubject<string>;
    } = {
        empresaSlug$: new BehaviorSubject('todas'),
        query$: new BehaviorSubject(''),
    };

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _gerenciasService: GerenciasService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this._gerenciasService.getGerencias().subscribe();

        this.gerencias$ = combineLatest([
            this._gerenciasService.gerencias$,
            this.filters.empresaSlug$,
            this.filters.query$,
        ]).pipe(
            distinctUntilChanged(),
            map(([gerencias, empresaSlug, query]) => {
                if (!gerencias || !gerencias.length) {
                    return;
                }

                let filteredGerencias = gerencias;

                if (empresaSlug !== 'todas') {
                    filteredGerencias = filteredGerencias.filter(
                        (gerencia) => gerencia.empresa == empresaSlug
                    );
                }

                if (query !== '') {
                    filteredGerencias = filteredGerencias.filter((gerencia) =>
                        gerencia.nombre
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    );
                }

                return filteredGerencias;
            })
        );
    }

    filtrarPorEmpresa(change: MatSelectChange): void {
        this.filters.empresaSlug$.next(change.value);
    }

    filtrarPorNombre(query: string): void {
        this.filters.query$.next(query);
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    agregarGerencia(): void {
        this._matDialog.open(GerenciasDetailsComponent, {
            autoFocus: false,
            data: {
                gerencia: {},
            },
        });
    }

    editarGerencia(gerencia: Gerencia): void {
        this._matDialog.open(GerenciasDetailsComponent, {
            autoFocus: false,
            data: {
                gerencia: cloneDeep(gerencia),
            },
        });
    }

    editarSubgerencia(gerencia: Gerencia, i: number) {
        this._matDialog.open(GerenciasSubgerenciaComponent, {
            autoFocus: false,
            data: {
                gerencia: cloneDeep(gerencia),
                index: i,
            },
        });
    }

    editarArea(gerencia: Gerencia, i: number, ia: number) {
        this._matDialog.open(GerenciasAreaComponent, {
            autoFocus: false,
            data: {
                gerencia: cloneDeep(gerencia),
                index: i,
                iarea: ia,
            },
        });
    }

    editarServicio(gerencia: Gerencia, i: number, ia: number, ias: number) {
        this._matDialog.open(GerenciasServicioComponent, {
            autoFocus: false,
            data: {
                gerencia: cloneDeep(gerencia),
                index: i,
                iarea: ia,
                iservicio: ias,
            },
        });
    }
}