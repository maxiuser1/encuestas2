import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pregunta } from '../../../../../../../api/model/gerencia';

@Component({
    selector: 'app-editar-pregunta',
    templateUrl: './editar-pregunta.component.html',
})
export class EncuestasEditarPreguntaComponent implements OnInit {
    form!: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _maDialogRef: MatDialogRef<EncuestasEditarPreguntaComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: { pregunta: Pregunta }
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            glosa: [this._data.pregunta.glosa, [Validators.required]],
            tipos: [this._data.pregunta.tipos, [Validators.required]],
            orden: [this._data.pregunta.orden, [Validators.required]],
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this._maDialogRef.close(this.form.value);
        }
    }
}
