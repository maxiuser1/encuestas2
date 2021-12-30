import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Respuesta } from '../../../../../../../api/model/gerencia';
import { RespuestasService } from '../respuestas.service';

@Component({
    selector: 'reportes-details',
    templateUrl: './details.component.html',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 112px auto auto 72px;

                @screen sm {
                    grid-template-columns: 112px auto auto 72px;
                }

                @screen md {
                    grid-template-columns: 112px auto auto 72px;
                }

                @screen lg {
                    grid-template-columns: 222px auto auto 72px;
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

    filters: {
        query$: BehaviorSubject<string>;
    } = {
        query$: new BehaviorSubject(''),
    };

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _respuestasService: RespuestasService
    ) {}

    ngOnInit(): void {
        this.respuestas$ = combineLatest([
            this._respuestasService.respuestas$,
            this.filters.query$,
        ]).pipe(
            distinctUntilChanged(),
            map(([respuestas, query]) => {
                if (!respuestas || !respuestas.length) {
                    return;
                }

                let filteredRespuestas = respuestas;

                if (query !== '') {
                    const qlq = query.toLowerCase();
                    filteredRespuestas = filteredRespuestas.filter(
                        (respuesta) =>
                            respuesta.name.toLowerCase().includes(qlq) ||
                            respuesta.evaluaciones.some((p) =>
                                p.servicio.toLowerCase().includes(qlq)
                            )
                    );
                }

                return filteredRespuestas;
            })
        );
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    filtrar(query: string): void {
        this.filters.query$.next(query);
    }
}
