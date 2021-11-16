import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, switchMap } from 'rxjs/operators';
import { Gerencia, Subgerencia } from '../../../../../../../api/model/gerencia';
import { GerenciasService } from '../gerencias.service';

@Component({
    selector: 'app-subgerencias',
    templateUrl: './subgerencias.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasSubgerenciaComponent implements OnInit {
    gerencia$: Observable<Gerencia>;

    gerenciaChanged: Subject<Gerencia> = new Subject<Gerencia>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA)
        private _data: { gerencia: Gerencia; index: number },
        private _gerenciasService: GerenciasService,
        private _matDialogRef: MatDialogRef<GerenciasSubgerenciaComponent>
    ) {}

    ngOnInit(): void {
        console.log('subg data', this._data);

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

    addAreaOnSubgerencia(gerencia: Gerencia, area: string): void {
        if (!gerencia.subgerencias[this._data.index].areas)
            gerencia.subgerencias[this._data.index].areas = [];
        console.log('gerencia on add area', gerencia);
        gerencia.subgerencias[this._data.index].areas.push({ nombre: area });
        this.gerenciaChanged.next(gerencia);
    }

    removeAreaFromSubgerencia(gerencia: Gerencia, i: number): void {
        gerencia.subgerencias[this._data.index].areas.splice(i, 1);
        this.gerenciaChanged.next(gerencia);
    }
}
