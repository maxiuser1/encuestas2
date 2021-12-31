import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoloNombresDirective } from './validations/solo-nombres.directive';

@NgModule({
    declarations: [SoloNombresDirective],
    exports: [SoloNombresDirective],
    imports: [CommonModule],
})
export class DirectivasModule {}
