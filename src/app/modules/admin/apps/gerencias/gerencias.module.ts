import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciasComponent } from './gerencias.component';
import { GerenciasListComponent } from './list/list.component';
import { GerenciasDetailsComponent } from './details/details.component';
import { Route, RouterModule } from '@angular/router';
import {
    GerenciaPersonasResolver,
    GerenciasResolver,
} from './gerencias.resolver';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'app/shared/shared.module';
import { GerenciasSubgerenciaComponent } from './subgerencias/subgerencias.component';
import { GerenciasAreasComponent } from './areas/areas.component';
import { GerenciasServiciosComponent } from './servicios/servicios.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { GerenciasAsignacionComponent } from './asignacion/asignacion.component';
import { GerenciasGerenciardComponent } from './gerenciard/gerenciard.component';
import { SubgerenciaComponent } from './subgerencia/subgerencia.component';
import { GerenciasAreaComponent } from './area/area.component';
import { GerenciasServicioComponent } from './servicio/servicio.component';
import { GerenciasAgregarServicioComponent } from './agregar-servicio/agregar-servicio.component';
import { GerenciasEditarServicioComponent } from './editar-servicio/editar-servicio.component';
import { GerenciasEditarAsignacionComponent } from './editar-asignacion/editar-asignacion.component';
import { GerenciasEvaluadoresComponent } from './evaluadores/evaluadores.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
const routes: Route[] = [
    {
        path: '',
        component: GerenciasComponent,
        children: [
            {
                path: '',
                component: GerenciasListComponent,
                resolve: {
                    gerencias: GerenciasResolver,
                    personas: GerenciaPersonasResolver,
                },
                children: [
                    {
                        path: ':id',
                        component: GerenciasDetailsComponent,
                    },
                ],
            },
        ],
    },
];

@NgModule({
    declarations: [
        GerenciasComponent,
        GerenciasListComponent,
        GerenciasDetailsComponent,
        GerenciasSubgerenciaComponent,
        GerenciasAreasComponent,
        GerenciasServiciosComponent,
        GerenciasAsignacionComponent,
        GerenciasGerenciardComponent,
        SubgerenciaComponent,
        GerenciasAreaComponent,
        GerenciasServicioComponent,
        GerenciasAgregarServicioComponent,
        GerenciasEditarServicioComponent,
        GerenciasEditarAsignacionComponent,
        GerenciasEvaluadoresComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatExpansionModule,
        MatSelectModule,
        MatDialogModule,
        MatChipsModule,
        MatBadgeModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatButtonModule,
        SharedModule,
    ],
})
export class GerenciasModule {}
