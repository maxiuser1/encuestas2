import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import {
    takeUntil,
    debounceTime,
    switchMap,
    startWith,
    map,
} from 'rxjs/operators';
import {
    Gerencia,
    Persona,
    Subgerencia,
} from '../../../../../../../api/model/gerencia';
import { GerenciasService } from '../gerencias.service';

@Component({
    selector: 'app-subgerencias',
    templateUrl: './subgerencias.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasSubgerenciaComponent implements OnInit {
    gerencia$: Observable<Gerencia>;
    personas: Persona[];
    controlResponsable = new FormControl();
    filteredOptions: Observable<Persona[]>;

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
        this._gerenciasService.personas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((personas: Persona[]) => {
                this.personas = personas;
                this._changeDetectorRef.markForCheck();
            });

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

        this.filteredOptions = this.controlResponsable.valueChanges.pipe(
            startWith(''),
            map((value) => (typeof value === 'string' ? value : value.name)),
            map((name) => (name ? this._filter(name) : this.personas.slice()))
        );
    }

    private _filter(value: string): Persona[] {
        const filterValue = value.toLowerCase();

        return this.personas.filter((option) =>
            option.name.toLowerCase().includes(filterValue)
        );
    }

    displayFn(user: Persona): string {
        return user && user.name ? user.name : '';
    }

    responsableCambiado(gerencia: Gerencia, data: Persona) {
        gerencia.gerenciasrd[this._data.index].responsable = {
            id: data.id,
            name: data.name,
            email: data.email,
        };
        this.gerenciaChanged.next(gerencia);
    }

    addAreaOnSubgerencia(gerencia: Gerencia, area: string): void {
        if (!gerencia.gerenciasrd[this._data.index].areas)
            gerencia.gerenciasrd[this._data.index].areas = [];
        gerencia.gerenciasrd[this._data.index].areas.push({ nombre: area });
        this.gerenciaChanged.next(gerencia);
    }

    removeAreaFromSubgerencia(gerencia: Gerencia, i: number): void {
        gerencia.gerenciasrd[this._data.index].areas.splice(i, 1);
        this.gerenciaChanged.next(gerencia);
    }
}
