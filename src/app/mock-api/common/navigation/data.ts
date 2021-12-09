/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'apps',
        title: 'Administración',
        subtitle: 'Módulo de gerencias',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'apps.gerencias',
                title: 'Gerencias',
                type: 'basic',
                icon: 'heroicons_outline:office-building',
                link: '/apps/gerencias',
            },
            {
                id: 'apps.contacts',
                title: 'Personas',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/apps/contacts',
            },
            {
                id: 'apps.contacts',
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
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Exampleb',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Examplec',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Exampled',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
