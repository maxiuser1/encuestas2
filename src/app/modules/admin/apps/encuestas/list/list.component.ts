import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { getGuid } from '../../../../../../../api/common/Utils';
import { Encuesta, Pregunta } from '../../../../../../../api/model/encuesta';
import { EncuestasAgregarPreguntaComponent } from '../agregar-pregunta/agregar-pregunta.component';
import { EncuestasAgregarComponent } from '../agregar/agregar.component';
import { EncuestasEditarPreguntaComponent } from '../editar-pregunta/editar-pregunta.component';
import { EncuestasEditarComponent } from '../editar/editar.component';
import { EncuestasService } from '../encuestas.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncuestasListComponent implements OnInit {
    encuestas$: Observable<Encuesta[]>;
    filters: {
        query$: BehaviorSubject<string>;
    } = {
        query$: new BehaviorSubject(''),
    };

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _encuestasService: EncuestasService,
        private _madDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this._encuestasService.getEncuestas().subscribe();

        this.encuestas$ = combineLatest([
            this._encuestasService.encuestas$,
            this.filters.query$,
        ]).pipe(
            distinctUntilChanged(),
            map(([encuestas, query]) => {
                if (!encuestas || !encuestas.length) {
                    return;
                }

                let filteredEncuestas = encuestas;

                if (query !== '') {
                    const qlq = query.toLowerCase();
                    filteredEncuestas = filteredEncuestas.filter(
                        (encuesta) =>
                            encuesta.nombre.toLowerCase().includes(qlq) ||
                            encuesta.preguntas.some((ss) =>
                                ss.glosa.toLowerCase().includes(qlq)
                            )
                    );
                }

                return filteredEncuestas;
            })
        );
    }

    filtrarPorNombre(query: string): void {
        this.filters.query$.next(query);
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    agregarEncuesta(): void {
        const dialogRef = this._madDialog.open(EncuestasAgregarComponent, {
            autoFocus: false,
        });

        dialogRef.afterClosed().subscribe((result: Encuesta) => {
            if (!result) return;
            result.preguntas = [];
            this._encuestasService.createEncuesta(result).subscribe((t) => {
                this._changeDetectorRef.markForCheck();
            });
        });
    }

    agregarPregunta(encuesta: Encuesta): void {
        const dialogRef = this._madDialog.open(
            EncuestasAgregarPreguntaComponent,
            {
                autoFocus: false,
            }
        );

        dialogRef.afterClosed().subscribe((result: Pregunta) => {
            if (!result) return;

            if (!encuesta.preguntas) encuesta.preguntas = [];
            this._encuestasService
                .updateEncuesta({
                    ...encuesta,
                    preguntas: [...encuesta.preguntas, result],
                })
                .subscribe((t) => this._changeDetectorRef.markForCheck());
        });
    }

    editarPregunta(encuesta: Encuesta, pregunta: Pregunta, indice: number) {
        const dialogRef = this._madDialog.open(
            EncuestasEditarPreguntaComponent,
            {
                autoFocus: false,
                data: {
                    pregunta: pregunta,
                },
            }
        );

        dialogRef.afterClosed().subscribe((result: Pregunta) => {
            if (!result) return;

            encuesta.preguntas[indice] = result;
            this._encuestasService
                .updateEncuesta(encuesta)
                .subscribe((t) => this._changeDetectorRef.markForCheck());
        });
    }

    editarEncuesta(encuesta: Encuesta): void {
        const dialogRef = this._madDialog.open(EncuestasEditarComponent, {
            autoFocus: false,
            data: {
                encuesta: encuesta,
            },
        });

        dialogRef.afterClosed().subscribe((result: Encuesta) => {
            if (!result) return;

            this._encuestasService
                .updateEncuesta({
                    ...encuesta,
                    nombre: result.nombre,
                })
                .subscribe((t) => this._changeDetectorRef.markForCheck());
        });
    }
}
