import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Gerencia } from '../../../../../../../api/model/gerencia';
import { GerenciasService } from '../gerencias.service';

@Component({
    selector: 'gerencias-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasListComponent implements OnInit {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    gerencias$: Observable<Gerencia[]>;

    gerenciasCount: number = 0;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _gerenciasService: GerenciasService) {}

    ngOnInit(): void {
        this.gerencias$ = this._gerenciasService.gerencias$;
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
