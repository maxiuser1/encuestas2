import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { Gerencia, Subgerencia } from '../../../../../../../api/model/gerencia';
import { GerenciasService } from '../gerencias.service';
import { GerenciasListComponent } from '../list/list.component';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasDetailsComponent implements OnInit, OnDestroy {
    gerencia$: Observable<Gerencia>;

    gerenciaChanged: Subject<Gerencia> = new Subject<Gerencia>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) private _data: { gerencia: Gerencia },
        private _gerenciasService: GerenciasService,
        private _matDialogRef: MatDialogRef<GerenciasDetailsComponent>
    ) {}

    ngOnInit(): void {
        console.log('wtf', this._data.gerencia);

        if (this._data.gerencia.id) {
            this._gerenciasService
                .getGerencia(this._data.gerencia.id)
                .subscribe();
            this.gerencia$ = this._gerenciasService.gerencia$;
        } else {
            const gerencia = {
                id: null,
                nombre: '',
                empresa: '',
                subgerencias: [],
            };

            this.gerencia$ = of(gerencia);
        }

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

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    updateGerenciaDetails(gerencia: Gerencia): void {
        console.log('gerencia up', gerencia);
        this.gerenciaChanged.next(gerencia);
    }

    crearGerencia(gerencia: Gerencia): void {
        console.log('llamo crearGerencia', gerencia);
        this._gerenciasService
            .createGerencia(gerencia)
            .subscribe((newGerencia: Gerencia) => {
                this.gerencia$ = this._gerenciasService.gerencia$;
                this._changeDetectorRef.markForCheck();
            });
    }

    updateTaskOnNote(gerencia: Gerencia, subgerencia: Subgerencia) {
        this.gerenciaChanged.next(gerencia);
    }

    addSubgerenciaOnGerencia(gerencia: Gerencia, subgerencia: string): void {
        console.log('gee', gerencia, subgerencia);
        if (subgerencia.trim() === '') {
            return;
        }

        gerencia.subgerencias.push({ nombre: subgerencia });
        this.gerenciaChanged.next(gerencia);
    }

    updateSubgerenciaOnGrencia(gerencia: Gerencia, subgerencia: string) {
        if (subgerencia) this.gerenciaChanged.next(gerencia);
    }

    removeSubgerenciaFromGerencia(gerencia: Gerencia, index) {
        console.log('i', index);
        gerencia.subgerencias.splice(index, 1);
        this.gerenciaChanged.next(gerencia);
    }
}
