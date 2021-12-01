import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { getGuid } from '../../../../../../../api/common/Utils';
import {
    Area,
    Asignable,
    Gerencia,
    Gerenciard,
    Subgerencia,
} from '../../../../../../../api/model/gerencia';
import { GerenciasAsignacionComponent } from '../asignacion/asignacion.component';
import { GerenciasEditarAsignacionComponent } from '../editar-asignacion/editar-asignacion.component';
import { GerenciasService } from '../gerencias.service';

@Component({
    selector: 'gerencias-app-gerenciard',
    templateUrl: './gerenciard.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasGerenciardComponent implements OnInit {
    @Input() gerencia: Gerencia;

    @Input() gerenciard: Gerenciard;

    gerenciaChanged: Subject<Gerencia> = new Subject<Gerencia>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _gerenciasService: GerenciasService,
        private _matDialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
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

    agregarSubGerencia() {
        const dialogRef = this._matDialog.open(GerenciasAsignacionComponent, {
            autoFocus: false,
            data: {
                titulo: `${this.gerencia.nombre}-${this.gerenciard.nombre}: nueva subgerencia`,
            },
        });

        dialogRef.afterClosed().subscribe((result: Subgerencia) => {
            if (!result) return;

            result.id = getGuid();

            if (
                !this.gerencia.gerenciasrd[
                    this.gerencia.gerenciasrd.findIndex(
                        (t) => t.id === this.gerenciard.id
                    )
                ].subgerencias
            )
                this.gerencia.gerenciasrd[
                    this.gerencia.gerenciasrd.findIndex(
                        (t) => t.id === this.gerenciard.id
                    )
                ].subgerencias = [];

            this.gerencia.gerenciasrd[
                this.gerencia.gerenciasrd.findIndex(
                    (t) => t.id === this.gerenciard.id
                )
            ].subgerencias.push(result);
            this.gerenciaChanged.next(this.gerencia);
        });
    }

    agregarArea() {
        const dialogRef = this._matDialog.open(GerenciasAsignacionComponent, {
            autoFocus: false,
            data: {
                titulo: `${this.gerencia.nombre}-${this.gerenciard.nombre}: nueva área`,
            },
        });

        dialogRef.afterClosed().subscribe((result: Area) => {
            if (!result) return;

            result.id = getGuid();

            if (
                !this.gerencia.gerenciasrd[
                    this.gerencia.gerenciasrd.findIndex(
                        (t) => t.id === this.gerenciard.id
                    )
                ].areas
            )
                this.gerencia.gerenciasrd[
                    this.gerencia.gerenciasrd.findIndex(
                        (t) => t.id === this.gerenciard.id
                    )
                ].areas = [];

            this.gerencia.gerenciasrd[
                this.gerencia.gerenciasrd.findIndex(
                    (t) => t.id === this.gerenciard.id
                )
            ].areas.push(result);
            this.gerenciaChanged.next(this.gerencia);
        });
    }

    eliminar() {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar gerencia R2',
            message: '¿Estas seguro que vas a eliminar esta gerencia?',
            actions: {
                confirm: {
                    label: 'Eliminar',
                },
            },
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                const igerenciard = this.gerencia.gerenciasrd.findIndex(
                    (t) => t.id === this.gerenciard.id
                );

                this.gerencia.gerenciasrd.splice(igerenciard, 1);
                this.gerenciaChanged.next(this.gerencia);
            }
        });
    }

    editar() {
        const dialogRef = this._matDialog.open(
            GerenciasEditarAsignacionComponent,
            {
                autoFocus: false,
                data: {
                    titulo: `Gerencia ${this.gerencia.nombre}-${
                        this.gerenciard?.nombre || ''
                    }: nuevo servicio`,
                    asignable: this.gerenciard,
                },
            }
        );

        dialogRef.afterClosed().subscribe((result: Asignable) => {
            if (!result) return;

            const igerenciard = this.gerencia.gerenciasrd.findIndex(
                (t) => t.id === this.gerenciard.id
            );

            this.gerencia.gerenciasrd[igerenciard] = {
                ...this.gerencia.gerenciasrd[igerenciard],
                nombre: result.nombre,
                responsable: result.responsable,
            };
            this.gerenciaChanged.next(this.gerencia);
        });
    }
}
