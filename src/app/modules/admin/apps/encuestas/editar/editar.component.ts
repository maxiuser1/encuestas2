import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Encuesta } from '../../../../../../../api/model/gerencia';

@Component({
    selector: 'app-editar',
    templateUrl: './editar.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncuestasEditarComponent implements OnInit {
    form!: FormGroup;
    constructor(
        private _formBuilder: FormBuilder,
        private _matDialogRef: MatDialogRef<EncuestasEditarComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: { encuesta: Encuesta }
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            nombre: [this._data.encuesta.nombre, [Validators.required]],
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this._matDialogRef.close(this.form.value);
        }
    }
}
