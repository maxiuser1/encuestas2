import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasListComponent } from './list/list.component';
import { Route, RouterModule } from '@angular/router';
import { PersonasComponent } from './personas.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PersonasResolver } from './personas.resolver';
import { PersonasAgregarComponent } from './agregar/agregar.component';
import { PersonasEditarComponent } from './editar/editar.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Route[] = [
    {
        path: '',
        component: PersonasComponent,
        children: [
            {
                path: '',
                component: PersonasListComponent,
                resolve: {
                    personas: PersonasResolver,
                },
            },
        ],
    },
];

@NgModule({
    declarations: [
        PersonasListComponent,
        PersonasAgregarComponent,
        PersonasEditarComponent,
        PersonasComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        SharedModule,
    ],
})
export class PersonasModule {}
