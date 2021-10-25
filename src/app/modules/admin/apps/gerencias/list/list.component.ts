import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'gerencias-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class GerenciasListComponent implements OnInit {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    constructor() {}

    ngOnInit(): void {}
}
