import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciasComponent } from './gerencias.component';
import { GerenciasListComponent } from './list/list.component';
import { GerenciasDetailsComponent } from './details/details.component';
import { Route, RouterModule } from '@angular/router';
import { GerenciasResolver } from './gerencias.resolver';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'app/shared/shared.module';

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
    ],
    imports: [
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatButtonModule,
        SharedModule,
    ],
})
export class GerenciasModule {}
