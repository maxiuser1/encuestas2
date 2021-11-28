import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import {
    Asignable,
    Gerencia,
    Persona,
} from '../../../../../../../api/model/gerencia';
import { GerenciasService } from '../gerencias.service';

@Component({
    selector: 'gerencias-editar-asignacion',
    templateUrl: './editar-asignacion.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasEditarAsignacionComponent implements OnInit {
    form!: FormGroup;
    personas: Persona[];
    personasFiltradas: Observable<Persona[]>;
    titulo: string = 'Editar registro';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        public matDialogRef: MatDialogRef<GerenciasEditarAsignacionComponent>,
        private _gerenciasService: GerenciasService,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) private _data: { titulo; asignable: Asignable }
    ) {}

    ngOnInit(): void {
        this.titulo = this._data.titulo;

        this.form = this._formBuilder.group({
            nombre: [this._data.asignable.nombre, [Validators.required]],
            responsable: [this._data.asignable.responsable],
        });

        this._gerenciasService.personas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((personas: Persona[]) => {
                this.personas = personas;
                this._changeDetectorRef.markForCheck();
            });

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

    private _filter(value: string): Persona[] {
        const filterValue = value.toLowerCase();

        return this.personas.filter((option) =>
            option.name.toLowerCase().includes(filterValue)
        );
    }

    displayFn(user: Persona): string {
        return user && user.name ? user.name : '';
    }

    onSubmit() {
        this.matDialogRef.close(this.form.value);
    }
}
