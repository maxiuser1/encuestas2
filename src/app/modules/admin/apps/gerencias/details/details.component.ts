import { DataRowOutlet } from '@angular/cdk/table';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Observable, of, Subject } from 'rxjs';
import {
    debounceTime,
    map,
    startWith,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import {
    Gerencia,
    Persona,
    Subgerencia,
} from '../../../../../../../api/model/gerencia';
import { GerenciasService } from '../gerencias.service';
import { GerenciasListComponent } from '../list/list.component';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasDetailsComponent implements OnInit {
    personas: Persona[];
    form!: FormGroup;

    personasFiltradas: Observable<Persona[]>;
    controlResponsable = new FormControl();

    gerenciaChanged: Subject<Gerencia> = new Subject<Gerencia>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: { gerencia: Gerencia },
        private _gerenciasService: GerenciasService,
        private _matDialogRef: MatDialogRef<GerenciasDetailsComponent>
    ) {}

    ngOnInit(): void {
        if (this._data.gerencia?.id) {
            this.form = this._formBuilder.group({
                nombre: [this._data.gerencia.nombre, [Validators.required]],
                responsable: [
                    this._data.gerencia.responsable,
                    [Validators.required],
                ],
                empresa: [this._data.gerencia.empresa, [Validators.required]],
            });

            this._gerenciasService
                .getGerencia(this._data.gerencia.id)
                .subscribe();
        } else {
            this.form = this._formBuilder.group({
                nombre: ['', [Validators.required]],
                responsable: ['', [Validators.required]],
                empresa: ['', [Validators.required]],
            });
        }

        this._gerenciasService.personas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((personas: Persona[]) => {
                this.personas = personas;
                this._changeDetectorRef.markForCheck();
            });

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

        this.personasFiltradas = this.controlResponsable.valueChanges.pipe(
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

    onSubmit() {
        console.log('thisfoirm', this.form);
        if (this.form.valid) {
            this._matDialogRef.close(this.form.value);
        }
    }
}
