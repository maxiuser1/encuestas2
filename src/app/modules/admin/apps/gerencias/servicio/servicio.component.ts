import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import {
    Area,
    Gerencia,
    Gerenciard,
    Servicio,
    Subgerencia,
} from '../../../../../../../api/model/gerencia';
import { GerenciasEditarServicioComponent } from '../editar-servicio/editar-servicio.component';
import { GerenciasEvaluadoresComponent } from '../evaluadores/evaluadores.component';
import { GerenciasService } from '../gerencias.service';

@Component({
    selector: 'gerencias-servicio',
    templateUrl: './servicio.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GerenciasServicioComponent implements OnInit {
    @Input() gerencia: Gerencia;
    @Input() gerenciard?: Gerenciard;
    @Input() subgerencia?: Subgerencia;
    @Input() area?: Area;
    @Input() servicio: Servicio;
    user: User;
    gerenciaChanged: Subject<Gerencia> = new Subject<Gerencia>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _gerenciasService: GerenciasService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _userService: UserService
    ) {}

    get puedeSuscribirse(): boolean {
        return (
            !this.servicio.definidos?.some((t) => t.id == this.user.id) &&
            !this.servicio.ascritos?.some((t) => t.id == this.user.id)
        );
    }

    get esEvaluador(): boolean {
        return (
            this.servicio.definidos?.some((t) => t.id == this.user.id) ||
            this.servicio.ascritos?.some((t) => t.id == this.user.id)
        );
    }

    ngOnInit(): void {
        this.gerenciaChanged
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(500),
                switchMap((gerencia) =>
                    this._gerenciasService.updateGerencia(gerencia)
                )
            )
            .subscribe(() => {
                this._changeDetectorRef.markForCheck();
            });

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    eliminar() {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar servicio',
            message: '¿Estas seguro que vas a eliminar este servicio?',
            actions: {
                confirm: {
                    label: 'Eliminar',
                },
            },
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                if (this.gerenciard) {
                    const igerenciaRd = this.gerencia.gerenciasrd.findIndex(
                        (t) => t.id === this.gerenciard.id
                    );

                    if (this.subgerencia) {
                        const isubgerencia = this.gerencia.gerenciasrd[
                            igerenciaRd
                        ].subgerencias.findIndex(
                            (t) => t.id == this.subgerencia.id
                        );

                        if (this.area) {
                            const iarea = this.gerencia.gerenciasrd[
                                igerenciaRd
                            ].subgerencias[isubgerencia].areas.findIndex(
                                (t) => t.id == this.area.id
                            );

                            const iservicio = this.gerencia.gerenciasrd[
                                igerenciaRd
                            ].subgerencias[isubgerencia].areas[
                                iarea
                            ].servicios.findIndex(
                                (t) => t.id == this.servicio.id
                            );

                            this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                                isubgerencia
                            ].areas[iarea].servicios.splice(iservicio, 1);
                        } else {
                            const iservicio = this.gerencia.gerenciasrd[
                                igerenciaRd
                            ].subgerencias[isubgerencia].servicios.findIndex(
                                (t) => t.id == this.servicio.id
                            );

                            this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                                isubgerencia
                            ].servicios.splice(iservicio, 1);
                        }
                    } else {
                        if (this.area) {
                            const iarea = this.gerencia.gerenciasrd[
                                igerenciaRd
                            ].areas.findIndex((t) => t.id == this.area.id);

                            const iservicio = this.gerencia.gerenciasrd[
                                igerenciaRd
                            ].areas[iarea].servicios.findIndex(
                                (t) => t.id == this.servicio.id
                            );

                            this.gerencia.gerenciasrd[igerenciaRd].areas[
                                iarea
                            ].servicios.splice(iservicio, 1);
                        }
                    }
                } else {
                    if (this.subgerencia) {
                        const isubgerencia =
                            this.gerencia.subgerencias.findIndex(
                                (t) => t.id == this.subgerencia.id
                            );

                        if (this.area) {
                            const iarea = this.gerencia.subgerencias[
                                isubgerencia
                            ].areas.findIndex((t) => t.id == this.area.id);

                            const iservicio = this.gerencia.subgerencias[
                                isubgerencia
                            ].areas[iarea].servicios.findIndex(
                                (t) => t.id == this.servicio.id
                            );

                            this.gerencia.subgerencias[isubgerencia].areas[
                                iarea
                            ].servicios.splice(iservicio, 1);
                        } else {
                            const iservicio = this.gerencia.subgerencias[
                                isubgerencia
                            ].servicios.findIndex(
                                (t) => t.id == this.servicio.id
                            );

                            this.gerencia.subgerencias[
                                isubgerencia
                            ].servicios.splice(iservicio, 1);
                        }
                    } else {
                        const iarea = this.gerencia.areas.findIndex(
                            (t) => t.id == this.area.id
                        );

                        const iservicio = this.gerencia.areas[
                            iarea
                        ].servicios.findIndex((t) => t.id == this.servicio.id);

                        this.gerencia.areas[iarea].servicios.splice(
                            iservicio,
                            1
                        );
                    }
                }

                this.gerenciaChanged.next(this.gerencia);
            }
        });
    }

    subscribirse() {
        if (this.gerenciard) {
            const igerenciaRd = this.gerencia.gerenciasrd.findIndex(
                (t) => t.id === this.gerenciard.id
            );

            if (this.subgerencia) {
                const isubgerencia = this.gerencia.gerenciasrd[
                    igerenciaRd
                ].subgerencias.findIndex((t) => t.id == this.subgerencia.id);

                if (this.area) {
                    const iarea = this.gerencia.gerenciasrd[
                        igerenciaRd
                    ].subgerencias[isubgerencia].areas.findIndex(
                        (t) => t.id == this.area.id
                    );

                    const iservicio = this.gerencia.gerenciasrd[
                        igerenciaRd
                    ].subgerencias[isubgerencia].areas[
                        iarea
                    ].servicios.findIndex((t) => t.id == this.servicio.id);

                    if (
                        !this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                            isubgerencia
                        ].areas[iarea].servicios[iservicio].ascritos
                    )
                        this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                            isubgerencia
                        ].areas[iarea].servicios[iservicio].ascritos = [];

                    this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                        isubgerencia
                    ].areas[iarea].servicios[iservicio] = {
                        ...this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                            isubgerencia
                        ].areas[iarea].servicios[iservicio],
                        ascritos: [
                            ...this.gerencia.gerenciasrd[igerenciaRd]
                                .subgerencias[isubgerencia].areas[iarea]
                                .servicios[iservicio].ascritos,
                            this.getUsuario(),
                        ],
                    };
                } else {
                    const iservicio = this.gerencia.gerenciasrd[
                        igerenciaRd
                    ].subgerencias[isubgerencia].servicios.findIndex(
                        (t) => t.id == this.servicio.id
                    );

                    if (
                        !this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                            isubgerencia
                        ].servicios[iservicio].ascritos
                    )
                        this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                            isubgerencia
                        ].servicios[iservicio].ascritos = [];

                    this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                        isubgerencia
                    ].servicios[iservicio] = {
                        ...this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                            isubgerencia
                        ].servicios[iservicio],
                        ascritos: [
                            ...this.gerencia.gerenciasrd[igerenciaRd]
                                .subgerencias[isubgerencia].servicios[iservicio]
                                .ascritos,
                            this.getUsuario(),
                        ],
                    };
                }
            } else {
                if (this.area) {
                    const iarea = this.gerencia.gerenciasrd[
                        igerenciaRd
                    ].areas.findIndex((t) => t.id == this.area.id);

                    const iservicio = this.gerencia.gerenciasrd[
                        igerenciaRd
                    ].areas[iarea].servicios.findIndex(
                        (t) => t.id == this.servicio.id
                    );

                    if (
                        !this.gerencia.gerenciasrd[igerenciaRd].areas[iarea]
                            .servicios[iservicio].ascritos
                    )
                        this.gerencia.gerenciasrd[igerenciaRd].areas[
                            iarea
                        ].servicios[iservicio].ascritos = [];

                    this.gerencia.gerenciasrd[igerenciaRd].areas[
                        iarea
                    ].servicios[iservicio] = {
                        ...this.gerencia.gerenciasrd[igerenciaRd].areas[iarea]
                            .servicios[iservicio],
                        ascritos: [
                            ...this.gerencia.gerenciasrd[igerenciaRd].areas[
                                iarea
                            ].servicios[iservicio].ascritos,
                            this.getUsuario(),
                        ],
                    };
                }
            }
        } else {
            if (this.subgerencia) {
                const isubgerencia = this.gerencia.subgerencias.findIndex(
                    (t) => t.id == this.subgerencia.id
                );

                if (this.area) {
                    const iarea = this.gerencia.subgerencias[
                        isubgerencia
                    ].areas.findIndex((t) => t.id == this.area.id);

                    const iservicio = this.gerencia.subgerencias[
                        isubgerencia
                    ].areas[iarea].servicios.findIndex(
                        (t) => t.id == this.servicio.id
                    );

                    if (
                        !this.gerencia.subgerencias[isubgerencia].areas[iarea]
                            .servicios[iservicio].ascritos
                    )
                        this.gerencia.subgerencias[isubgerencia].areas[
                            iarea
                        ].servicios[iservicio].ascritos = [];

                    this.gerencia.subgerencias[isubgerencia].areas[
                        iarea
                    ].servicios[iservicio] = {
                        ...this.gerencia.subgerencias[isubgerencia].areas[iarea]
                            .servicios[iservicio],
                        ascritos: [
                            ...this.gerencia.subgerencias[isubgerencia].areas[
                                iarea
                            ].servicios[iservicio].ascritos,
                            this.getUsuario(),
                        ],
                    };
                } else {
                    const iservicio = this.gerencia.subgerencias[
                        isubgerencia
                    ].servicios.findIndex((t) => t.id == this.servicio.id);

                    if (
                        !this.gerencia.subgerencias[isubgerencia].servicios[
                            iservicio
                        ].ascritos
                    )
                        this.gerencia.subgerencias[isubgerencia].servicios[
                            iservicio
                        ].ascritos = [];

                    this.gerencia.subgerencias[isubgerencia].servicios[
                        iservicio
                    ] = {
                        ...this.gerencia.subgerencias[isubgerencia].servicios[
                            iservicio
                        ],
                        ascritos: [
                            ...this.gerencia.subgerencias[isubgerencia]
                                .servicios[iservicio].ascritos,
                            this.getUsuario(),
                        ],
                    };
                }
            } else {
                const iarea = this.gerencia.areas.findIndex(
                    (t) => t.id == this.area.id
                );

                const iservicio = this.gerencia.areas[
                    iarea
                ].servicios.findIndex((t) => t.id == this.servicio.id);

                if (!this.gerencia.areas[iarea].servicios[iservicio].ascritos)
                    this.gerencia.areas[iarea].servicios[iservicio].ascritos =
                        [];

                this.gerencia.areas[iarea].servicios[iservicio] = {
                    ...this.gerencia.areas[iarea].servicios[iservicio],
                    ascritos: [
                        ...this.gerencia.areas[iarea].servicios[iservicio]
                            .ascritos,
                        this.getUsuario(),
                    ],
                };
            }
        }

        this.gerenciaChanged.next(this.gerencia);
    }

    private getUsuario() {
        return {
            id: this.user.id,
            name: this.user.name,
            email: this.user.email,
        };
    }

    evaluadores() {
        const dialogRef = this._matDialog.open(GerenciasEvaluadoresComponent, {
            autoFocus: false,
            data: {
                titulo: `${this.gerencia.nombre}-${
                    this.gerenciard?.nombre || ''
                }: nuevo servicio`,
                servicio: this.servicio,
            },
        });

        dialogRef.afterClosed().subscribe((result: Servicio) => {
            if (!result) return;
            if (this.gerenciard) {
                const igerenciaRd = this.gerencia.gerenciasrd.findIndex(
                    (t) => t.id === this.gerenciard.id
                );

                if (this.subgerencia) {
                    const isubgerencia = this.gerencia.gerenciasrd[
                        igerenciaRd
                    ].subgerencias.findIndex(
                        (t) => t.id == this.subgerencia.id
                    );

                    if (this.area) {
                        const iarea = this.gerencia.gerenciasrd[
                            igerenciaRd
                        ].subgerencias[isubgerencia].areas.findIndex(
                            (t) => t.id == this.area.id
                        );

                        const iservicio = this.gerencia.gerenciasrd[
                            igerenciaRd
                        ].subgerencias[isubgerencia].areas[
                            iarea
                        ].servicios.findIndex((t) => t.id == this.servicio.id);

                        this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                            isubgerencia
                        ].areas[iarea].servicios[iservicio] = {
                            ...this.gerencia.gerenciasrd[igerenciaRd]
                                .subgerencias[isubgerencia].areas[iarea]
                                .servicios[iservicio],
                            definidos: result.equipo,
                        };
                    } else {
                        const iservicio = this.gerencia.gerenciasrd[
                            igerenciaRd
                        ].subgerencias[isubgerencia].servicios.findIndex(
                            (t) => t.id == this.servicio.id
                        );

                        this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                            isubgerencia
                        ].servicios[iservicio] = {
                            ...this.gerencia.gerenciasrd[igerenciaRd]
                                .subgerencias[isubgerencia].servicios[
                                iservicio
                            ],
                            definidos: result.equipo,
                        };
                    }
                } else {
                    if (this.area) {
                        const iarea = this.gerencia.gerenciasrd[
                            igerenciaRd
                        ].areas.findIndex((t) => t.id == this.area.id);

                        const iservicio = this.gerencia.gerenciasrd[
                            igerenciaRd
                        ].areas[iarea].servicios.findIndex(
                            (t) => t.id == this.servicio.id
                        );

                        this.gerencia.gerenciasrd[igerenciaRd].areas[
                            iarea
                        ].servicios[iservicio] = {
                            ...this.gerencia.gerenciasrd[igerenciaRd].areas[
                                iarea
                            ].servicios[iservicio],
                            definidos: result.equipo,
                        };
                    }
                }
            } else {
                if (this.subgerencia) {
                    const isubgerencia = this.gerencia.subgerencias.findIndex(
                        (t) => t.id == this.subgerencia.id
                    );

                    if (this.area) {
                        const iarea = this.gerencia.subgerencias[
                            isubgerencia
                        ].areas.findIndex((t) => t.id == this.area.id);

                        const iservicio = this.gerencia.subgerencias[
                            isubgerencia
                        ].areas[iarea].servicios.findIndex(
                            (t) => t.id == this.servicio.id
                        );

                        this.gerencia.subgerencias[isubgerencia].areas[
                            iarea
                        ].servicios[iservicio] = {
                            ...this.gerencia.subgerencias[isubgerencia].areas[
                                iarea
                            ].servicios[iservicio],
                            definidos: result.equipo,
                        };
                    } else {
                        const iservicio = this.gerencia.subgerencias[
                            isubgerencia
                        ].servicios.findIndex((t) => t.id == this.servicio.id);

                        this.gerencia.subgerencias[isubgerencia].servicios[
                            iservicio
                        ] = {
                            ...this.gerencia.subgerencias[isubgerencia]
                                .servicios[iservicio],
                            definidos: result.equipo,
                        };
                    }
                } else {
                    const iarea = this.gerencia.areas.findIndex(
                        (t) => t.id == this.area.id
                    );

                    const iservicio = this.gerencia.areas[
                        iarea
                    ].servicios.findIndex((t) => t.id == this.servicio.id);

                    this.gerencia.areas[iarea].servicios[iservicio] = {
                        ...this.gerencia.areas[iarea].servicios[iservicio],
                        definidos: result.equipo,
                    };
                }
            }

            this.gerenciaChanged.next(this.gerencia);
        });
    }

    editar() {
        const dialogRef = this._matDialog.open(
            GerenciasEditarServicioComponent,
            {
                autoFocus: false,
                data: {
                    titulo: `${this.gerencia.nombre}-${
                        this.gerenciard?.nombre || ''
                    }: nuevo servicio`,
                    servicio: this.servicio,
                },
            }
        );

        dialogRef.afterClosed().subscribe((result: Servicio) => {
            if (!result) return;
            if (this.gerenciard) {
                const igerenciaRd = this.gerencia.gerenciasrd.findIndex(
                    (t) => t.id === this.gerenciard.id
                );

                if (this.subgerencia) {
                    const isubgerencia = this.gerencia.gerenciasrd[
                        igerenciaRd
                    ].subgerencias.findIndex(
                        (t) => t.id == this.subgerencia.id
                    );

                    if (this.area) {
                        const iarea = this.gerencia.gerenciasrd[
                            igerenciaRd
                        ].subgerencias[isubgerencia].areas.findIndex(
                            (t) => t.id == this.area.id
                        );

                        const iservicio = this.gerencia.gerenciasrd[
                            igerenciaRd
                        ].subgerencias[isubgerencia].areas[
                            iarea
                        ].servicios.findIndex((t) => t.id == this.servicio.id);

                        this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                            isubgerencia
                        ].areas[iarea].servicios[iservicio] = {
                            ...this.gerencia.gerenciasrd[igerenciaRd]
                                .subgerencias[isubgerencia].areas[iarea]
                                .servicios[iservicio],
                            nombre: result.nombre,
                            tipo: result.tipo,
                            responsable: result.responsable,
                            equipo: result.equipo,
                        };
                    } else {
                        const iservicio = this.gerencia.gerenciasrd[
                            igerenciaRd
                        ].subgerencias[isubgerencia].servicios.findIndex(
                            (t) => t.id == this.servicio.id
                        );

                        this.gerencia.gerenciasrd[igerenciaRd].subgerencias[
                            isubgerencia
                        ].servicios[iservicio] = {
                            ...this.gerencia.gerenciasrd[igerenciaRd]
                                .subgerencias[isubgerencia].servicios[
                                iservicio
                            ],
                            nombre: result.nombre,
                            tipo: result.tipo,
                            responsable: result.responsable,
                            equipo: result.equipo,
                        };
                    }
                } else {
                    if (this.area) {
                        const iarea = this.gerencia.gerenciasrd[
                            igerenciaRd
                        ].areas.findIndex((t) => t.id == this.area.id);

                        const iservicio = this.gerencia.gerenciasrd[
                            igerenciaRd
                        ].areas[iarea].servicios.findIndex(
                            (t) => t.id == this.servicio.id
                        );

                        this.gerencia.gerenciasrd[igerenciaRd].areas[
                            iarea
                        ].servicios[iservicio] = {
                            ...this.gerencia.gerenciasrd[igerenciaRd].areas[
                                iarea
                            ].servicios[iservicio],
                            nombre: result.nombre,
                            tipo: result.tipo,
                            responsable: result.responsable,
                            equipo: result.equipo,
                        };
                    }
                }
            } else {
                if (this.subgerencia) {
                    const isubgerencia = this.gerencia.subgerencias.findIndex(
                        (t) => t.id == this.subgerencia.id
                    );

                    if (this.area) {
                        const iarea = this.gerencia.subgerencias[
                            isubgerencia
                        ].areas.findIndex((t) => t.id == this.area.id);

                        const iservicio = this.gerencia.subgerencias[
                            isubgerencia
                        ].areas[iarea].servicios.findIndex(
                            (t) => t.id == this.servicio.id
                        );

                        this.gerencia.subgerencias[isubgerencia].areas[
                            iarea
                        ].servicios[iservicio] = {
                            ...this.gerencia.subgerencias[isubgerencia].areas[
                                iarea
                            ].servicios[iservicio],
                            nombre: result.nombre,
                            tipo: result.tipo,
                            responsable: result.responsable,
                            equipo: result.equipo,
                        };
                    } else {
                        const iservicio = this.gerencia.subgerencias[
                            isubgerencia
                        ].servicios.findIndex((t) => t.id == this.servicio.id);

                        this.gerencia.subgerencias[isubgerencia].servicios[
                            iservicio
                        ] = {
                            ...this.gerencia.subgerencias[isubgerencia]
                                .servicios[iservicio],
                            nombre: result.nombre,
                            tipo: result.tipo,
                            responsable: result.responsable,
                            equipo: result.equipo,
                        };
                    }
                } else {
                    const iarea = this.gerencia.areas.findIndex(
                        (t) => t.id == this.area.id
                    );

                    const iservicio = this.gerencia.areas[
                        iarea
                    ].servicios.findIndex((t) => t.id == this.servicio.id);

                    this.gerencia.areas[iarea].servicios[iservicio] = {
                        ...this.gerencia.areas[iarea].servicios[iservicio],
                        nombre: result.nombre,
                        tipo: result.tipo,
                        responsable: result.responsable,
                        equipo: result.equipo,
                    };
                }
            }

            this.gerenciaChanged.next(this.gerencia);
        });
    }
}
