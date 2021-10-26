import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciasComponent } from './gerencias.component';
import { GerenciasListComponent } from './list/list.component';
import { GerenciasDetailsComponent } from './details/details.component';
import { Route, RouterModule } from '@angular/router';
import { CanDeactivateGerenciasDetails } from './gerencias.guards';
import { GerenciasResolver } from './gerencias.resolver';

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
    imports: [RouterModule.forChild(routes), CommonModule],
})
export class GerenciasModule {}
