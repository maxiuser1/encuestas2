import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { inicioRoutes } from './inicio.routing';
import { InicioComponent } from './inicio.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [InicioComponent],
    imports: [RouterModule.forChild(inicioRoutes), MatIconModule, SharedModule],
})
export class InicioModule {}
