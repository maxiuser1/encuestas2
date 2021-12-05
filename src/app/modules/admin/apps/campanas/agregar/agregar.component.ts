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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Encuesta } from '../../../../../../../api/model/encuesta';
import { CampanasService } from '../campanas.service';

@Component({
    selector: 'app-agregar',
    templateUrl: './agregar.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampanasAgregarComponent implements OnInit {
    form!: FormGroup;
    encuestas: Encuesta[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private matDialogRef: MatDialogRef<CampanasAgregarComponent>,
        private _campanasService: CampanasService,
        private _formBuilde: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) private _data: { titulo }
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilde.group({
            nombre: ['', [Validators.required]],
            encuesta: ['', Validators.required],
            fechaLimite: [null, Validators.required],
        });

        this._campanasService.encuestas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((encuestas: Encuesta[]) => {
                console.log('zaina', encuestas);
                this.encuestas = encuestas;
                this._changeDetectorRef.markForCheck();
            });
    }

    onSubmit() {
        if (this.form.valid) {
            this.matDialogRef.close(this.form.value);
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
