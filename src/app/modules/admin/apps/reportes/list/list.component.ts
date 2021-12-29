import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Campana, Respuesta } from '../../../../../../../api/model/gerencia';
import { CampanasService } from '../campanas.service';
import { RespuestasService } from '../respuestas.service';

@Component({
    selector: 'reportes-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesListComponent implements OnInit {
    campanas$: Observable<Campana[]>;

    filters: {
        query$: BehaviorSubject<string>;
    } = {
        query$: new BehaviorSubject(''),
    };

    campaniaChanged: Subject<Campana> = new Subject<Campana>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _campanasService: CampanasService,
        private _repotersService: RespuestasService
    ) {}

    ngOnInit(): void {
        this.campanas$ = combineLatest([
            this._campanasService.campanas$,
            this.filters.query$,
        ]).pipe(
            distinctUntilChanged(),
            map(([campanas, query]) => {
                if (!campanas || !campanas.length) {
                    return;
                }
                let filteredCampanas = campanas;
                return filteredCampanas;
            })
        );
    }

    filtrarPorNombre(query: string): void {
        this.filters.query$.next(query);
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    exportar(id) {
        this._repotersService.getRespuestasCsv(id).subscribe((t: any) => {
            console.log('res', t);
            let csvContent = 'EVALUADOR;GERENCIA;SERVICIO;PREGUNTA;NOTA';
            for (let cadaRespuesta of t) {
                for (let cadaEvaluacion of cadaRespuesta.evaluaciones) {
                    for (let cadaPregunta of cadaEvaluacion.preguntas) {
                        const dataLine = `${cadaRespuesta.name};${cadaEvaluacion.gerencia};${cadaEvaluacion.servicio};${cadaPregunta.glosa};${cadaPregunta.valor}`;
                        csvContent += `\n${dataLine}`;
                    }
                }
            }

            const blob = new Blob(['\uFEFF' + csvContent], {
                type: 'text/csv;charset=utf-8;',
            });

            const link = document.createElement('a');
            if (link.download !== undefined) {
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', 'data.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    }

    comentarios(id) {
        this._repotersService.getComentariosCsv(id).subscribe((t: any) => {
            console.log('res', t);
            let csvContent = 'EVALUADOR;GERENCIA;SERVICIO;COMENTARIO';
            for (let cadaRespuesta of t) {
                for (let cadaEvaluacion of cadaRespuesta.evaluaciones) {
                    if (cadaEvaluacion.comentario) {
                        const dataLine = `${cadaRespuesta.name};${cadaEvaluacion.gerencia};${cadaEvaluacion.servicio};${cadaEvaluacion.comentario}`;
                        csvContent += `\n${dataLine}`;
                    }
                }
            }

            const blob = new Blob(['\uFEFF' + csvContent], {
                type: 'text/csv;charset=utf-8;',
            });

            const link = document.createElement('a');
            if (link.download !== undefined) {
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', 'comentarios.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    }
}
