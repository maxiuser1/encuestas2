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
                icon: 'heroicons_outline:academic-cap',
                link: '/apps/notes',
            },
            {
                id: 'apps.contacts',
                title: 'Personas',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/apps/contacts',
            },
            {
                id: 'apps.contacts',
                title: 'Encuestas',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/apps/tasks',
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
