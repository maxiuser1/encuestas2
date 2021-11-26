import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'app-encuestas',
    templateUrl: './encuestas.component.html',
    styleUrls: ['./encuestas.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncuestasComponent {
    constructor() {}
}
