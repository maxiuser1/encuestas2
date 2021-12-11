import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-agregar',
    templateUrl: './agregar.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonasAgregarComponent implements OnInit {
    form!: FormGroup;

    constructor(
        private matDialogRef: MatDialogRef<PersonasAgregarComponent>,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            name: ['', [Validators.required]],
            email: [
                '',
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
            this.matDialogRef.close(this.form.value);
        }
    }
}
