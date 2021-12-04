import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
} from '@angular/core';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampanasDetalleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
