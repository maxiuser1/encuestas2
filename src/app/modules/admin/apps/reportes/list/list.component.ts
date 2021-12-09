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
import { Campana } from '../../../../../../../api/model/gerencia';
import { CampanasService } from '../campanas.service';

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
        private _campanasService: CampanasService
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
}
