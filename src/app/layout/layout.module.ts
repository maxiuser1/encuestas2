import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';

import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { SharedModule } from 'app/shared/shared.module';
import { ModernLayoutModule } from './layouts/horizontal/modern/modern.module';

const layoutModules = [
    // Empty
    EmptyLayoutModule,

    // Horizontal navigation

    ModernLayoutModule,

    // Vertical navigation
];

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        MatIconModule,
        MatTooltipModule,
        FuseDrawerModule,
        SharedModule,
        SettingsModule,
        ...layoutModules,
    ],
    exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
