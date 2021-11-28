import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import {
    takeUntil,
    debounceTime,
    switchMap,
    startWith,
    map,
} from 'rxjs/operators';
import { Gerencia, Persona } from '../../../../../../../api/model/gerencia';
import { GerenciasService } from '../gerencias.service';
import { GerenciasSubgerenciaComponent } from '../subgerencias/subgerencias.component';

@Component({
    selector: 'app-gerencias-servicios',
    templateUrl: './servicios.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasServiciosComponent implements OnInit {
    personas: Persona[];
    gerencia$: Observable<Gerencia>;
    controlResponsable = new FormControl();
    filteredOptions: Observable<Persona[]>;

    equipoFilteredOptions: Observable<Persona[]>;
    controlEquipo = new FormControl();

    gerenciaChanged: Subject<Gerencia> = new Subject<Gerencia>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA)
        private _data: {
            gerencia: Gerencia;
            index: number;
            iarea: number;
            iservicio: number;
        },
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

        this.controlResponsable.setValue(
            this._data.gerencia.gerenciasrd[this._data.index].areas[
                this._data.iarea
            ].servicios[this._data.iservicio].responsable
        );

        this.filteredOptions = this.controlResponsable.valueChanges.pipe(
            startWith(''),
            map((value) => (typeof value === 'string' ? value : value.name)),
            map((name) => (name ? this._filter(name) : this.personas.slice()))
        );

        this.equipoFilteredOptions = this.controlEquipo.valueChanges.pipe(
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
        // if(!gerencia.subgerencias[this._data.index].areas[this._data.iarea].servicios[this._data.iservicio].responsable)
        gerencia.gerenciasrd[this._data.index].areas[
            this._data.iarea
        ].servicios[this._data.iservicio].responsable = {
            id: data.id,
            name: data.name,
            email: data.email,
        };
        this.gerenciaChanged.next(gerencia);
    }

    updateGerenciaDetails(gerencia: Gerencia): void {
        this.gerenciaChanged.next(gerencia);
    }

    addServicioOnArea(gerencia: Gerencia, servicio: string): void {
        if (
            !gerencia.gerenciasrd[this._data.index].areas[this._data.iarea]
                .servicios
        )
            gerencia.gerenciasrd[this._data.index].areas[
                this._data.iarea
            ].servicios = [];
        gerencia.gerenciasrd[this._data.index].areas[
            this._data.iarea
        ].servicios.push({ nombre: servicio });
        this.gerenciaChanged.next(gerencia);
    }

    agregarEquipo(gerencia: Gerencia, persona: Persona) {
        if (
            !gerencia.gerenciasrd[this._data.index].areas[this._data.iarea]
                .servicios[this._data.iservicio].equipo
        )
            gerencia.gerenciasrd[this._data.index].areas[
                this._data.iarea
            ].servicios[this._data.iservicio].equipo = [];

        gerencia.gerenciasrd[this._data.index].areas[
            this._data.iarea
        ].servicios[this._data.iservicio].equipo.push({
            id: persona.id,
            name: persona.name,
            email: persona.email,
        });
        this.gerenciaChanged.next(gerencia);

        this.controlEquipo.setValue('');
    }
}
