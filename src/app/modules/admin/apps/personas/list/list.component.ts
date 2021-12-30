import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { getGuid } from '../../../../../../../api/common/Utils';
import { Persona } from '../../../../../../../api/model/gerencia';
import { PersonasAgregarComponent } from '../agregar/agregar.component';
import { PersonasEditarComponent } from '../editar/editar.component';
import { PersonasService } from '../personas.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styles: [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 112px auto 72px;

                @screen sm {
                    grid-template-columns: 212px auto 72px;
                }

                @screen md {
                    grid-template-columns: 212px auto 72px;
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
export class PersonasListComponent implements OnInit {
    personas$: Observable<Persona[]>;

    filters: {
        query$: BehaviorSubject<string>;
    } = {
        query$: new BehaviorSubject(''),
    };

    searchInputControl: FormControl = new FormControl();
    isLoading: boolean = false;

    constructor(
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _personasService: PersonasService
    ) {}

    ngOnInit(): void {
        this._personasService.getPersonas().subscribe();

        this.personas$ = combineLatest([
            this._personasService.personas$,
            this.filters.query$,
        ]).pipe(
            distinctUntilChanged(),
            map(([personas, query]) => {
                if (!personas || !personas.length) {
                    return;
                }

                let filteredPersonas = personas;

                if (query !== '') {
                    const qlq = query.toLowerCase();
                    filteredPersonas = filteredPersonas.filter(
                        (persona) =>
                            persona.name.toLowerCase().includes(qlq) ||
                            persona.email.toLowerCase().includes(qlq)
                    );
                }
                return filteredPersonas;
            })
        );
    }

    filtrarPorNombre(query: string): void {
        this.filters.query$.next(query);
    }

    crearPersona() {
        const dialogRef = this._matDialog.open(PersonasAgregarComponent, {
            autoFocus: false,
        });

        dialogRef.afterClosed().subscribe((result: Persona) => {
            if (!result) return;
            result.id = getGuid();
            this._personasService
                .createPersona(result)
                .subscribe((t) => this._changeDetectorRef.markForCheck());
        });
    }

    editar(persona: Persona) {
        const dialogRef = this._matDialog.open(PersonasEditarComponent, {
            autoFocus: false,
            data: {
                persona: cloneDeep(persona),
            },
        });

        dialogRef.afterClosed().subscribe((result: Persona) => {
            if (!result) return;

            this._personasService
                .updatePersona({
                    ...persona,
                    name: result.name,
                    email: result.email,
                })
                .subscribe((t) => this._changeDetectorRef.markForCheck());
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
