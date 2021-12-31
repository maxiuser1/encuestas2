import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestasComponent } from './encuestas.component';
import { Route, RouterModule } from '@angular/router';
import { EncuestasListComponent } from './list/list.component';
import { EncuestasResolver } from './encuestas.resolver';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'app/shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EncuestasAgregarComponent } from './agregar/agregar.component';
import { EncuestasEditarComponent } from './editar/editar.component';
import { EncuestasAgregarPreguntaComponent } from './agregar-pregunta/agregar-pregunta.component';
import { EncuestasEditarPreguntaComponent } from './editar-pregunta/editar-pregunta.component';
import { MatMenuModule } from '@angular/material/menu';
import { DirectivasModule } from 'app/core/directives/directivas.module';

const routes: Route[] = [
    {
        path: '',
        component: EncuestasComponent,
        children: [
            {
                path: '',
                component: EncuestasListComponent,
                resolve: {
                    gerencias: EncuestasResolver,
                },
            },
        ],
    },
];

@NgModule({
    declarations: [
        EncuestasComponent,
        EncuestasListComponent,
        EncuestasAgregarComponent,
        EncuestasEditarComponent,
        EncuestasAgregarPreguntaComponent,
        EncuestasEditarPreguntaComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatButtonModule,
        SharedModule,
        DirectivasModule,
    ],
})
export class EncuestasModule {}
