import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciasComponent } from './gerencias.component';
import { GerenciasListComponent } from './list/list.component';
import { GerenciasDetailsComponent } from './details/details.component';
import { Route, RouterModule } from '@angular/router';
import { CanDeactivateGerenciasDetails } from './gerencias.guards';

const routes: Route[] = [
    {
        path: '',
        component: GerenciasComponent,
        children: [
            {
                path: '',
                component: GerenciasListComponent,
                children: [
                    {
                        path: ':id',
                        component: GerenciasDetailsComponent,
                        canDeactivate: [CanDeactivateGerenciasDetails],
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
