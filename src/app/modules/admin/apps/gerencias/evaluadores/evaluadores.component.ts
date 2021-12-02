import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { optionsToString } from 'rrule/dist/esm/src/optionstostring';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Persona, Servicio } from '../../../../../../../api/model/gerencia';
import { GerenciasService } from '../gerencias.service';

@Component({
    selector: 'gerencias-evaluadores',
    templateUrl: './evaluadores.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasEvaluadoresComponent implements OnInit {
    form!: FormGroup;
    personas: Persona[];
    personasFiltradas: Observable<Persona[]>;
    equipoFilteredOptions: Observable<Persona[]>;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        public matDialogRef: MatDialogRef<GerenciasEvaluadoresComponent>,
        private _gerenciasService: GerenciasService,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) private _data: { titulo; servicio: Servicio }
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            equipo: this._formBuilder.array([]),
        });

        this._data.servicio.definidos?.forEach((t) => {
            const equipoForm = this._formBuilder.group({
                integrante: [t],
            });

            this.integrantes.push(equipoForm);
        });

        this._gerenciasService.personas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((personas: Persona[]) => {
                this.personas = personas.filter(
                    (t) =>
                        !this.integrantes.controls.some(
                            (p) => p.value.integrante.id == t.id
                        )
                );
                this._changeDetectorRef.markForCheck();
            });
    }

    _filter(value: string): Persona[] {
        if (typeof value === 'string') {
            const filterValue = value.toLowerCase();
            return this.personas.filter(
                (option) =>
                    option.name.toLowerCase().includes(filterValue) &&
                    !this.integrantes.controls.some(
                        (t) => t.value.integrante.id === option.id
                    )
            );
        } else return this.personas;
    }

    get integrantes() {
        return this.form.controls['equipo'] as FormArray;
    }

    addIntegrante() {
        const equipoForm = this._formBuilder.group({
            integrante: [''],
        });

        this.equipoFilteredOptions = equipoForm.valueChanges.pipe(
            startWith(''),
            map((value) => {
                console.log('value', value);
                return typeof value === 'string' ? value : value.integrante;
            }),
            map((name) => (name ? this._filter(name) : this.personas.slice()))
        );

        this.integrantes.push(equipoForm);
    }

    displayFn(user: Persona): string {
        return user && user.name ? user.name : '';
    }

    onSubmit() {
        let serviciovm: Servicio = { ...this.form.value, equipo: [] };

        this.form.value.equipo.forEach((t) => {
            serviciovm.equipo.push({
                id: t.integrante.id,
                name: t.integrante.name,
                email: t.integrante.email,
            });
        });
        this.matDialogRef.close(serviciovm);
    }

    eliminarIntegrante(index) {
        this.integrantes.removeAt(index);
    }
}
