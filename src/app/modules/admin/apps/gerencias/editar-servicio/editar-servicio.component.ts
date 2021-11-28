import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Persona, Servicio } from '../../../../../../../api/model/gerencia';
import { GerenciasAsignacionComponent } from '../asignacion/asignacion.component';
import { GerenciasService } from '../gerencias.service';
@Component({
    selector: 'app-editar-servicio',
    templateUrl: './editar-servicio.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasEditarServicioComponent implements OnInit {
    form!: FormGroup;
    personas: Persona[];
    personasFiltradas: Observable<Persona[]>;
    equipoFilteredOptions: Observable<Persona[]>;
    titulo: string = 'Nuevo registro';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        public matDialogRef: MatDialogRef<GerenciasAsignacionComponent>,
        private _gerenciasService: GerenciasService,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) private _data: { titulo; servicio: Servicio }
    ) {}

    ngOnInit(): void {
        this.titulo = this._data.titulo;

        this.form = this._formBuilder.group({
            nombre: [this._data.servicio.nombre, [Validators.required]],
            responsable: [
                this._data.servicio.responsable,
                [Validators.required],
            ],
            tipo: [this._data.servicio.tipo, [Validators.required]],
            equipo: this._formBuilder.array([]),
        });

        this._data.servicio.equipo?.forEach((t) => {
            const equipoForm = this._formBuilder.group({
                integrante: [t],
            });

            this.integrantes.push(equipoForm);
        });

        this._gerenciasService.personas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((personas: Persona[]) => {
                this.personas = personas;
                this._changeDetectorRef.markForCheck();
            });

        this.equipoFilteredOptions = this.integrantes.valueChanges.pipe(
            startWith(''),
            map((value) =>
                typeof value === 'string' ? value : value[0].integrante
            ),
            map((name) => (name ? this._filter(name) : this.personas.slice()))
        );

        this.personasFiltradas =
            this.form.controls.responsable.valueChanges.pipe(
                startWith(''),
                map((value) =>
                    typeof value === 'string' ? value : value.name
                ),
                map((name) =>
                    name ? this._filter(name) : this.personas.slice()
                )
            );
    }

    get integrantes() {
        return this.form.controls['equipo'] as FormArray;
    }

    addIntegrante() {
        const equipoForm = this._formBuilder.group({
            integrante: [''],
        });

        this.integrantes.push(equipoForm);
    }

    _filter(value: string): Persona[] {
        if (typeof value === 'string') {
            const filterValue = value.toLowerCase();
            return this.personas.filter((option) =>
                option.name.toLowerCase().includes(filterValue)
            );
        } else return this.personas;
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
