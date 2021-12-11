import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'pages/inicio' },

    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'pages/inicio',
    },

    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((m) => m.AuthUnlockSessionModule),
            },
        ],
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/landing/home/home.module').then(
                        (m) => m.LandingHomeModule
                    ),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'apps',
                children: [
                    {
                        path: 'gerencias',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/gerencias/gerencias.module'
                            ).then((m) => m.GerenciasModule),
                    },
                    {
                        path: 'encuestas',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/encuestas/encuestas.module'
                            ).then((m) => m.EncuestasModule),
                    },
                    {
                        path: 'personas',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/personas/personas.module'
                            ).then((m) => m.PersonasModule),
                    },
                    {
                        path: 'campanas',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/campanas/campanas.module'
                            ).then((m) => m.CampanasModule),
                    },
                    {
                        path: 'reportes',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/apps/reportes/reportes.module'
                            ).then((m) => m.ReportesModule),
                    },
                ],
            },
            {
                path: 'pages',
                children: [
                    {
                        path: 'inicio',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/pages/inicio/inicio.module'
                            ).then((m) => m.InicioModule),
                    },
                ],
            },
        ],
    },
];
