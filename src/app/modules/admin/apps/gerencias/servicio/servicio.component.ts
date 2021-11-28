import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import {
    Area,
    Gerencia,
    Gerenciard,
    Servicio,
    Subgerencia,
} from '../../../../../../../api/model/gerencia';

@Component({
    selector: 'gerencias-servicio',
    templateUrl: './servicio.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasServicioComponent implements OnInit {
    @Input() gerencia: Gerencia;
    @Input() gerenciard: Gerenciard;
    @Input() subgerencia: Subgerencia;
    @Input() area: Area;
    @Input() servicio: Servicio;
    constructor() {}

    ngOnInit(): void {}
}
