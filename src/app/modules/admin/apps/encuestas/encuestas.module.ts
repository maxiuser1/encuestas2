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
    declarations: [EncuestasComponent, EncuestasListComponent],
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
        MatButtonModule,
        SharedModule,
    ],
})
export class EncuestasModule {}
