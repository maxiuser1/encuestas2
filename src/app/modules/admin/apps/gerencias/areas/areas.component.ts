import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, switchMap } from 'rxjs/operators';
import { Gerencia } from '../../../../../../../api/model/gerencia';
import { GerenciasService } from '../gerencias.service';
import { GerenciasSubgerenciaComponent } from '../subgerencias/subgerencias.component';

@Component({
    selector: 'app-gerencias-areas',
    templateUrl: './areas.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasAreaComponent implements OnInit {
    gerencia$: Observable<Gerencia>;

    gerenciaChanged: Subject<Gerencia> = new Subject<Gerencia>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA)
        private _data: { gerencia: Gerencia; index: number; iarea: number },
        private _gerenciasService: GerenciasService,
        private _matDialogRef: MatDialogRef<GerenciasSubgerenciaComponent>
    ) {}

    ngOnInit(): void {
        this._gerenciasService.getGerencia(this._data.gerencia.id).subscribe();

        this.gerencia$ = this._gerenciasService.gerencia$;

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

    addServicioOnArea(gerencia: Gerencia, servicio: string): void {
        if (
            !gerencia.subgerencias[this._data.index].areas[this._data.iarea]
                .servicios
        )
            gerencia.subgerencias[this._data.index].areas[
                this._data.iarea
            ].servicios = [];
        gerencia.subgerencias[this._data.index].areas[
            this._data.iarea
        ].servicios.push({ nombre: servicio });
        this.gerenciaChanged.next(gerencia);
    }
}
