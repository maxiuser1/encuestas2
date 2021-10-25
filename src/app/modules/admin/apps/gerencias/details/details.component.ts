import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { GerenciasListComponent } from '../list/list.component';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasDetailsComponent implements OnInit {
    constructor(private _gerenciasListComponent: GerenciasListComponent) {}

    ngOnInit(): void {}

    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._gerenciasListComponent.matDrawer.close();
    }
}
