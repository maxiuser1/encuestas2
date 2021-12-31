import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        const data: any = {
            compact: [
                {
                    id: 'inicio',
                    title: 'Inicio',
                    type: 'basic',
                    icon: 'heroicons_outline:home',
                    link: '/pages/inicio',
                },
                {
                    id: 'admin',
                    title: 'Administración',
                    type: 'group',
                    icon: 'heroicons_outline:adjustments',
                    children: [
                        {
                            id: 'apps.gerencias',
                            title: 'Gerencias',
                            type: 'basic',
                            icon: 'heroicons_outline:office-building',
                            link: '/apps/gerencias',
                        },
                        {
                            id: 'apps.personas',
                            title: 'Personas',
                            type: 'basic',
                            icon: 'heroicons_outline:user-group',
                            link: '/apps/personas',
                        },
                        {
                            id: 'apps.encuestas',
                            title: 'Encuestas',
                            type: 'basic',
                            icon: 'heroicons_outline:question-mark-circle',
                            link: '/apps/encuestas',
                        },
                        {
                            id: 'apps.campanas',
                            title: 'Campañas',
                            type: 'basic',
                            icon: 'heroicons_outline:chat-alt',
                            link: '/apps/campanas',
                        },
                        {
                            id: 'apps.reportes',
                            title: 'Reportes',
                            type: 'basic',
                            icon: 'heroicons_outline:chart-pie',
                            link: '/apps/reportes',
                        },
                    ],
                },
            ],
            default: [
                {
                    id: 'inicio',
                    title: 'Inicio',
                    type: 'basic',
                    icon: 'heroicons_outline:home',
                    link: '/pages/inicio',
                },
                {
                    id: 'admin',
                    title: 'Administración',
                    type: 'group',
                    icon: 'heroicons_outline:adjustments',
                    children: [
                        {
                            id: 'apps.gerencias',
                            title: 'Gerencias',
                            type: 'basic',
                            icon: 'heroicons_outline:office-building',
                            link: '/apps/gerencias',
                        },
                        {
                            id: 'apps.personas',
                            title: 'Personas',
                            type: 'basic',
                            icon: 'heroicons_outline:user-group',
                            link: '/apps/personas',
                        },
                        {
                            id: 'apps.encuestas',
                            title: 'Encuestas',
                            type: 'basic',
                            icon: 'heroicons_outline:question-mark-circle',
                            link: '/apps/encuestas',
                        },
                        {
                            id: 'apps.campanas',
                            title: 'Campañas',
                            type: 'basic',
                            icon: 'heroicons_outline:chat-alt',
                            link: '/apps/campanas',
                        },
                        {
                            id: 'apps.reportes',
                            title: 'Reportes',
                            type: 'basic',
                            icon: 'heroicons_outline:chart-pie',
                            link: '/apps/reportes',
                        },
                    ],
                },
            ],
            futuristic: [
                {
                    id: 'inicio',
                    title: 'Inicio',
                    type: 'basic',
                    icon: 'heroicons_outline:home',
                    link: '/pages/inicio',
                },
                {
                    id: 'admin',
                    title: 'Administración',
                    type: 'group',
                    icon: 'heroicons_outline:adjustments',
                    children: [
                        {
                            id: 'apps.gerencias',
                            title: 'Gerencias',
                            type: 'basic',
                            icon: 'heroicons_outline:office-building',
                            link: '/apps/gerencias',
                        },
                        {
                            id: 'apps.personas',
                            title: 'Personas',
                            type: 'basic',
                            icon: 'heroicons_outline:user-group',
                            link: '/apps/personas',
                        },
                        {
                            id: 'apps.encuestas',
                            title: 'Encuestas',
                            type: 'basic',
                            icon: 'heroicons_outline:question-mark-circle',
                            link: '/apps/encuestas',
                        },
                        {
                            id: 'apps.campanas',
                            title: 'Campañas',
                            type: 'basic',
                            icon: 'heroicons_outline:chat-alt',
                            link: '/apps/campanas',
                        },
                        {
                            id: 'apps.reportes',
                            title: 'Reportes',
                            type: 'basic',
                            icon: 'heroicons_outline:chart-pie',
                            link: '/apps/reportes',
                        },
                    ],
                },
            ],
            horizontal: [
                {
                    id: 'inicio',
                    title: 'Inicio',
                    type: 'basic',
                    icon: 'heroicons_outline:home',
                    link: '/pages/inicio',
                },
                {
                    id: 'admin',
                    title: 'Administración',
                    type: 'group',
                    icon: 'heroicons_outline:adjustments',
                    children: [
                        {
                            id: 'apps.gerencias',
                            title: 'Gerencias',
                            type: 'basic',
                            icon: 'heroicons_outline:office-building',
                            link: '/apps/gerencias',
                        },
                        {
                            id: 'apps.personas',
                            title: 'Personas',
                            type: 'basic',
                            icon: 'heroicons_outline:user-group',
                            link: '/apps/personas',
                        },
                        {
                            id: 'apps.encuestas',
                            title: 'Encuestas',
                            type: 'basic',
                            icon: 'heroicons_outline:question-mark-circle',
                            link: '/apps/encuestas',
                        },
                        {
                            id: 'apps.campanas',
                            title: 'Campañas',
                            type: 'basic',
                            icon: 'heroicons_outline:chat-alt',
                            link: '/apps/campanas',
                        },
                        {
                            id: 'apps.reportes',
                            title: 'Reportes',
                            type: 'basic',
                            icon: 'heroicons_outline:chart-pie',
                            link: '/apps/reportes',
                        },
                    ],
                },
            ],
        };
        this._navigation.next(data);
        return of(data);
    }
}
