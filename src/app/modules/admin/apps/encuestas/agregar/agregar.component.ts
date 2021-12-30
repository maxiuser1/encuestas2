import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-agregar',
    templateUrl: './agregar.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncuestasAgregarComponent implements OnInit {
    form!: FormGroup;
    constructor(
        private _formBuilder: FormBuilder,
        private _matDialogRef: MatDialogRef<EncuestasAgregarComponent>
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            nombre: ['', [Validators.required]],
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this._matDialogRef.close(this.form.value);
        }
    }
}
