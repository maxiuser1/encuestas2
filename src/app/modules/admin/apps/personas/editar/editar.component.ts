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
import { Persona } from '../../../../../../../api/model/gerencia';
import { PersonasService } from '../personas.service';

@Component({
    selector: 'app-editar',
    templateUrl: './editar.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonasEditarComponent implements OnInit {
    form!: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) private _data: { persona: Persona },
        private _personasService: PersonasService,
        private _formBuilder: FormBuilder,
        private _matDialogRef: MatDialogRef<PersonasEditarComponent>
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            name: [this._data.persona.name, [Validators.required]],
            email: [
                this._data.persona.email,
                [
                    Validators.required,
                    Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
                    ),
                ],
            ],
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this._matDialogRef.close(this.form.value);
        }
    }
}
