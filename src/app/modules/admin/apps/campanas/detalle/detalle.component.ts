import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
} from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Respuesta } from '../../../../../../../api/model/gerencia';
import { RespuestasService } from '../respuestas.service';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
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
export class CampanasDetalleComponent implements OnInit {
    urlRespuetas: string;
    respuestas$: Observable<Respuesta[]>;
    isLoading: boolean = false;
    constructor(private _respuestasService: RespuestasService) {
        this.urlRespuetas = window.location.hostname.includes('white')
            ? environment.prdrespuestas
            : environment.qarespuestas;
    }

    ngOnInit(): void {
        this.respuestas$ = this._respuestasService.respuestas$;
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
