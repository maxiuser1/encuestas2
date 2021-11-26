import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Encuesta } from '../../../../../../../api/model/encuesta';
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
        private _encuestasService: EncuestasService
    ) {}

    ngOnInit(): void {
        this._encuestasService.getEncuestas().subscribe();

        this.encuestas$ = combineLatest([
            this._encuestasService.encuestas$,
            this.filters.query$,
        ]).pipe(
            distinctUntilChanged(),
            map(([encuestas, query]) => {
                console.log('llegaron enc', encuestas);
                if (!encuestas || !encuestas.length) {
                    return;
                }

                let filteredEncuestas = encuestas;

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
}
