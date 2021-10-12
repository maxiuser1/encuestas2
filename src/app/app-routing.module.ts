import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerenciasComponent } from './private/organizacion/components/gerencias/gerencias.component';
import { OrganizacionComponent } from './private/organizacion/organizacion.component';
import { LoginComponent } from './public/components/login/login.component';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  {
    path: 'public',
    component: PublicComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'organizacion',
    component: OrganizacionComponent,
    children: [
      {
        path: 'gerencias',
        component: GerenciasComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const ArrayOfComponents = [
  PublicComponent,
  LoginComponent,
  OrganizacionComponent,
  GerenciasComponent,
];
