import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { FuseNavigationItem } from '@fuse/components/navigation';

@Component({
    selector: 'modern-layout',
    templateUrl: './modern.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ModernLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    menus: FuseNavigationItem[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.menus = [
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

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
