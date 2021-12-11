import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Persona } from '../../../../../../../api/model/gerencia';
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
    searchInputControl: FormControl = new FormControl();
    isLoading: boolean = false;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _personasService: PersonasService
    ) {}

    ngOnInit(): void {
        this.personas$ = this._personasService.personas$;
    }

    crearPersona() {}

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
