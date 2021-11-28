import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
} from '@angular/core';
import {
    Gerencia,
    Gerenciard,
    Subgerencia,
    Servicio,
} from '../../../../../../../api/model/gerencia';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GerenciasService } from '../gerencias.service';
import { GerenciasAsignacionComponent } from '../asignacion/asignacion.component';
import { getGuid } from '../../../../../../../api/common/Utils';

@Component({
    selector: 'gerencias-subgerencia',
    templateUrl: './subgerencia.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubgerenciaComponent implements OnInit {
    @Input() gerencia: Gerencia;
    @Input() gerenciard?: Gerenciard;
    @Input() subgerencia: Subgerencia;

    gerenciaChanged: Subject<Gerencia> = new Subject<Gerencia>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _gerenciasService: GerenciasService
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
    agregarArea() {
        const dialogRef = this._matDialog.open(GerenciasAsignacionComponent, {
            autoFocus: false,
            data: {
                titulo: `Gerencia ${this.gerencia.nombre}-${
                    this.gerenciard?.nombre || ''
                }: nueva área`,
            },
        });

        dialogRef.afterClosed().subscribe((result: Subgerencia) => {
            result.id = getGuid();

            if (this.gerenciard) {
                // si pertenezco a una gerencia R2
                const igerenciaRd = this.gerencia.gerenciasrd.findIndex(
                    (t) => t.id === this.gerenciard.id
                );

                const isubgerencia = this.gerencia.gerenciasrd[
                    igerenciaRd
                ].subgerencias.findIndex((p) => p.id == this.subgerencia.id);

                if (
                    !this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                        isubgerencia
                    ].areas
                )
                    this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                        isubgerencia
                    ].areas = [];

                this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                    isubgerencia
                ].areas.push(result);
            } else {
                // si no tengo gerenciard significa que voy a
                // agregar una subgerencia directa a la gerencia
                const isubgerencia = this.gerencia.subgerencias.findIndex(
                    (t) => t.id == this.subgerencia.id
                );
                if (!this.gerencia.subgerencias[isubgerencia].areas)
                    this.gerencia.subgerencias[isubgerencia].areas = [];

                this.gerencia.subgerencias[isubgerencia].areas.push(result);
            }

            this.gerenciaChanged.next(this.gerencia);
        });
    }

    agregarServicio() {
        const dialogRef = this._matDialog.open(GerenciasAsignacionComponent, {
            autoFocus: false,
            data: {
                titulo: `Gerencia ${this.gerencia.nombre}-${
                    this.gerenciard?.nombre || ''
                }: nuevo servicio`,
            },
        });

        dialogRef.afterClosed().subscribe((result: Servicio) => {
            result.id = getGuid();

            if (this.gerenciard) {
                // si pertenezco a una gerencia R2
                const igerenciaRd = this.gerencia.gerenciasrd.findIndex(
                    (t) => t.id === this.gerenciard.id
                );

                const isubgerencia = this.gerencia.gerenciasrd[
                    igerenciaRd
                ].subgerencias.findIndex((p) => p.id == this.subgerencia.id);

                if (
                    !this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                        isubgerencia
                    ].servicios
                )
                    this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                        isubgerencia
                    ].servicios = [];

                this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                    isubgerencia
                ].servicios.push(result);
            } else {
                // si no tengo gerenciard significa que voy a
                // agregar una subgerencia directa a la gerencia
                const isubgerencia = this.gerencia.subgerencias.findIndex(
                    (t) => t.id == this.subgerencia.id
                );
                if (!this.gerencia.subgerencias[isubgerencia].servicios)
                    this.gerencia.subgerencias[isubgerencia].servicios = [];

                this.gerencia.subgerencias[isubgerencia].servicios.push(result);
            }

            this.gerenciaChanged.next(this.gerencia);
        });
    }
}
