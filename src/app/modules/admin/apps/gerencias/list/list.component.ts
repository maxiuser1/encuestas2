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
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import { getGuid } from '../../../../../../../api/common/Utils';
import {
    Area,
    Gerencia,
    Gerenciard,
    Servicio,
    Subgerencia,
} from '../../../../../../../api/model/gerencia';
import { GerenciasAreasComponent } from '../areas/areas.component';
import { GerenciasAsignacionComponent } from '../asignacion/asignacion.component';
import { GerenciasDetailsComponent } from '../details/details.component';
import { GerenciasService } from '../gerencias.service';
import { GerenciasServiciosComponent } from '../servicios/servicios.component';
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
    user: User;

    gerenciaChanged: Subject<Gerencia> = new Subject<Gerencia>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _gerenciasService: GerenciasService,
        private _userService: UserService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
            });

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
                    const qlq = query.toLowerCase();
                    filteredGerencias = filteredGerencias.filter((gerencia) =>
                        JSON.stringify(gerencia).toLowerCase().includes(qlq)
                    );
                }

                return filteredGerencias;
            })
        );

        this.gerenciaChanged
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(500),
                switchMap((gerencia) =>
                    this._gerenciasService.updateGerencia(gerencia)
                )
            )
            .subscribe(() => {
                this._changeDetectorRef.markForCheck();
            });
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
        const dialogRef = this._matDialog.open(GerenciasDetailsComponent, {
            autoFocus: false,
            data: {
                gerencia: {},
            },
        });

        dialogRef.afterClosed().subscribe((result: Gerencia) => {
            if (!result) return;
            this._gerenciasService.createGerencia(result).subscribe((t) => {
                this._changeDetectorRef.markForCheck();
            });
        });
    }

    editarGerencia(gerencia: Gerencia): void {
        const dialogRef = this._matDialog.open(GerenciasDetailsComponent, {
            autoFocus: false,
            data: {
                gerencia: cloneDeep(gerencia),
            },
        });

        dialogRef.afterClosed().subscribe((result: Gerencia) => {
            if (!result) return;
            gerencia = {
                ...gerencia,
                nombre: result.nombre,
                responsable: result.responsable,
                empresa: result.empresa,
            };
            this._gerenciasService.updateGerencia(gerencia).subscribe((t) => {
                this._changeDetectorRef.markForCheck();
            });
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
        this._matDialog.open(GerenciasAreasComponent, {
            autoFocus: false,
            data: {
                gerencia: cloneDeep(gerencia),
                index: i,
                iarea: ia,
            },
        });
    }

    editarServicio(gerencia: Gerencia, i: number, ia: number, ias: number) {
        this._matDialog.open(GerenciasServiciosComponent, {
            autoFocus: false,
            data: {
                gerencia: cloneDeep(gerencia),
                index: i,
                iarea: ia,
                iservicio: ias,
            },
        });
    }

    subscribirse(gerencia: Gerencia, i: number, ia: number, ias: number) {
        if (!gerencia.gerenciasrd[i].areas[ia].servicios[ias].ascritos)
            gerencia.gerenciasrd[i].areas[ia].servicios[ias].ascritos = [];

        gerencia.gerenciasrd[i].areas[ia].servicios[ias].ascritos.push({
            id: this.user.id,
            name: this.user.name,
            email: this.user.email,
        });

        this.gerenciaChanged.next(gerencia);
    }

    agregarGerenciard(gerencia: Gerencia) {
        const dialogRef = this._matDialog.open(GerenciasAsignacionComponent, {
            autoFocus: false,
            data: {
                titulo: `${gerencia.nombre}: nueva gerencia R2`,
            },
        });

        dialogRef.afterClosed().subscribe((result: Gerenciard) => {
            if (!result) return;
            result.id = getGuid();
            if (!gerencia.gerenciasrd) gerencia.gerenciasrd = [];
            gerencia.gerenciasrd.push(result);
            this.gerenciaChanged.next(gerencia);
        });
    }

    agregarSubGerencia(gerencia: Gerencia) {
        const dialogRef = this._matDialog.open(GerenciasAsignacionComponent, {
            autoFocus: false,
            data: {
                titulo: `${gerencia.nombre}: nueva subgerencia`,
            },
        });

        dialogRef.afterClosed().subscribe((result: Subgerencia) => {
            if (!result) return;
            result.id = getGuid();
            if (!gerencia.subgerencias) gerencia.subgerencias = [];
            gerencia.subgerencias.push(result);
            this.gerenciaChanged.next(gerencia);
        });
    }

    agregarArea(gerencia: Gerencia) {
        const dialogRef = this._matDialog.open(GerenciasAsignacionComponent, {
            autoFocus: false,
            data: {
                titulo: `${gerencia.nombre}: nueva área`,
            },
        });

        dialogRef.afterClosed().subscribe((result: Area) => {
            if (!result) return;
            result.id = getGuid();
            if (!gerencia.areas) gerencia.areas = [];
            gerencia.areas.push(result);
            this.gerenciaChanged.next(gerencia);
        });
    }
}
