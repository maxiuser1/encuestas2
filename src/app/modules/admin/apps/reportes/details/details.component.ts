import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../../../../../api/model/gerencia';
import { RespuestasService } from '../respuestas.service';

@Component({
    selector: 'reportes-details',
    templateUrl: './details.component.html',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 112px auto 72px;

                @screen sm {
                    grid-template-columns: 112px auto 72px;
                }

                @screen md {
                    grid-template-columns: 112px auto 72px;
                }

                @screen lg {
                    grid-template-columns: 222px auto 72px;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesDetailsComponent implements OnInit {
    respuestas$: Observable<Respuesta[]>;
    isLoading: boolean = false;
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _respuestasService: RespuestasService
    ) {}

    ngOnInit(): void {
        this.respuestas$ = this._respuestasService.respuestas$;
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
