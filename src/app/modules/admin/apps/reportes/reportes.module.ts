import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ReportesDetailsComponent } from './details/details.component';
import { ReportesListComponent } from './list/list.component';
import { ReportesComponent } from './reportes.component';
import {
    ReportesResolver,
    ReportesRespuestasResolver,
} from './reportes.resolver';

const routes: Route[] = [
    {
        path: '',
        component: ReportesComponent,
        children: [
            {
                path: '',
                component: ReportesListComponent,
                resolve: {
                    campanas: ReportesResolver,
                },
            },
            {
                path: ':id',
                component: ReportesDetailsComponent,
                resolve: {
                    respuestas: ReportesRespuestasResolver,
                },
            },
        ],
    },
];

@NgModule({
    declarations: [
        ReportesComponent,
        ReportesListComponent,
        ReportesDetailsComponent,
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
    ],
})
export class ReportesModule {}
