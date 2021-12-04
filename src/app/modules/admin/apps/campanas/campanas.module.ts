import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CampanasComponent } from './campanas.component';
import { CampanasListComponent } from './list/list.component';
import {
    CampanasEncuestasResolver,
    CampanasResolver,
} from './campanas.resolver';
import { CampanasDetalleComponent } from './detalle/detalle.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CampanasAgregarComponent } from './agregar/agregar.component';

const routes: Route[] = [
    {
        path: '',
        component: CampanasComponent,
        children: [
            {
                path: '',
                component: CampanasListComponent,
                resolve: {
                    campanas: CampanasResolver,
                },
                children: [
                    {
                        path: ':id',
                        component: CampanasDetalleComponent,
                        resolve: {
                            encuestas: CampanasEncuestasResolver,
                        },
                    },
                ],
            },
        ],
    },
];

@NgModule({
    declarations: [
        CampanasComponent,
        CampanasListComponent,
        CampanasDetalleComponent,
        CampanasAgregarComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
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
export class CampanasModule {}
