import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getGuid } from '../../../../../../../api/common/Utils';
import {
    Area,
    Gerencia,
    Gerenciard,
    Subgerencia,
} from '../../../../../../../api/model/gerencia';
import { GerenciasAsignacionComponent } from '../asignacion/asignacion.component';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { GerenciasService } from '../gerencias.service';
import { GerenciasAgregarServicioComponent } from '../agregar-servicio/agregar-servicio.component';

@Component({
    selector: 'gerencias-area',
    templateUrl: './area.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasAreaComponent implements OnInit {
    @Input() gerencia: Gerencia;
    @Input() gerenciard?: Gerenciard;
    @Input() subgerencia?: Subgerencia;
    @Input() area: Area;

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

    agregarServicio() {
        const dialogRef = this._matDialog.open(
            GerenciasAgregarServicioComponent,
            {
                autoFocus: false,
                data: {
                    titulo: `${this.gerencia.nombre}-${
                        this.gerenciard?.nombre || ''
                    }: nuevo servicio`,
                },
            }
        );

        dialogRef.afterClosed().subscribe((result: Subgerencia) => {
            result.id = getGuid();

            if (this.gerenciard) {
                const igerenciaRd = this.gerencia.gerenciasrd.findIndex(
                    (t) => t.id === this.gerenciard.id
                );

                if (this.subgerencia) {
                    const isubgerencia = this.gerencia.gerenciasrd[
                        igerenciaRd
                    ].subgerencias.findIndex(
                        (t) => t.id == this.subgerencia.id
                    );

                    const iarea = this.gerencia.gerenciasrd[
                        igerenciaRd
                    ].subgerencias[isubgerencia].areas.findIndex(
                        (t) => t.id == this.area.id
                    );

                    if (
                        !this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                            isubgerencia
                        ].areas[iarea].servicios
                    )
                        this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                            isubgerencia
                        ].areas[iarea].servicios = [];
                    this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                        isubgerencia
                    ].areas[iarea].servicios.push(result);
                } else {
                    const iarea = this.gerencia.gerenciasrd[
                        igerenciaRd
                    ].areas.findIndex((t) => t.id == this.area.id);

                    if (
                        !this.gerencia.gerenciasrd[igerenciaRd].areas[iarea]
                            .servicios
                    )
                        this.gerencia.gerenciasrd[igerenciaRd].areas[
                            iarea
                        ].servicios = [];
                    this.gerencia.gerenciasrd[igerenciaRd].areas[
                        iarea
                    ].servicios.push(result);
                }
            } else {
                if (this.subgerencia) {
                    const isubgerencia = this.gerencia.subgerencias.findIndex(
                        (t) => t.id == this.subgerencia.id
                    );

                    const iarea = this.gerencia.subgerencias[
                        isubgerencia
                    ].areas.findIndex((t) => t.id == this.area.id);

                    if (
                        !this.gerencia.subgerencias[isubgerencia].areas[iarea]
                            .servicios
                    )
                        this.gerencia.subgerencias[isubgerencia].areas[
                            iarea
                        ].servicios = [];
                    this.gerencia.subgerencias[isubgerencia].areas[
                        iarea
                    ].servicios.push(result);
                } else {
                    const iarea = this.gerencia.areas.findIndex(
                        (t) => t.id == this.area.id
                    );
                    if (!this.gerencia.areas[iarea].servicios)
                        this.gerencia.areas[iarea].servicios = [];
                    this.gerencia.areas[iarea].servicios.push(result);
                }
            }

            this.gerenciaChanged.next(this.gerencia);
        });
    }
}
