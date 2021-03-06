import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CampanasComponent } from './campanas.component';
import { CampanasListComponent } from './list/list.component';
import {
    CampanasEncuestasResolver,
    CampanasResolver,
    CampanasRespuestasResolver,
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import localeEsCl from '@angular/common/locales/es-CL';
import { MatSortModule } from '@angular/material/sort';

import {
    registerLocaleData,
    LocationStrategy,
    HashLocationStrategy,
} from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DirectivasModule } from 'app/core/directives/directivas.module';

registerLocaleData(localeEsCl, 'es-CL');
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
                    encuestas: CampanasEncuestasResolver,
                },
            },
            {
                path: ':id',
                component: CampanasDetalleComponent,
                resolve: {
                    respuestas: CampanasRespuestasResolver,
                },
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
        MatDatepickerModule,
        MatDialogModule,
        MatChipsModule,
        MatMomentDateModule,
        MatBadgeModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        MatMenuModule,
        MatButtonModule,
        MatSortModule,
        MatPaginatorModule,
        SharedModule,
        DirectivasModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es-CL' },
        { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    ],
})
export class CampanasModule {}
