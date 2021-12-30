import { validateHorizontalPosition } from '@angular/cdk/overlay';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormGroupDirective,
    Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-agregar-pregunta',
    templateUrl: './agregar-pregunta.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncuestasAgregarPreguntaComponent implements OnInit {
    form!: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _maDialogRef: MatDialogRef<EncuestasAgregarPreguntaComponent>
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            glosa: ['', [Validators.required]],
            tipos: ['', [Validators.required]],
            orden: [0, [Validators.required]],
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this._maDialogRef.close(this.form.value);
        }
    }
}
