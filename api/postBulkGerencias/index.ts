import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { CosmosClient } from '@azure/cosmos';
import { getGuid } from '../common/Utils';
import { Area, Gerencia, Servicio, Subgerencia } from '../model/gerencia';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
    const client = new CosmosClient(
        'AccountEndpoint=https://encuestasdb.documents.azure.com:443/;AccountKey=jbUfTnFcRnprj1rKnuMxQXBsiJr4ph2MTxdyDWhKYHNZe0z0Et6ecKIkKnVOcY8uaWBTiPDG3BjBetDtj7lfpA=='
    );
    const containerGerencia = await client
        .database('organizacion')
        .container('gerencias');
    const containerPersonas = await client
        .database('organizacion')
        .container('personas');

    const usuarios: any[] = [
        {
            Gerente: 'Carlos Villalobos',
            Email: 'carlos.villalobos@bciseguros.com',
            id: 'ba62890e-7a1d-4e9b-833c-27c1b5c7cffd',
        },
        {
            Gerente: 'Michel Delgado',
            Email: 'michel.delgado@bciseguros.com',
            id: '30e1dc7c-cd62-4a1e-83ed-4d8129386f13',
        },
        {
            Gerente: 'Felipe Arancibia',
            Email: 'Felipe.Arancibia@bciseguros.com',
            id: 'decf60e2-da03-417c-ab30-d0a5faa9be10',
        },
        {
            Gerente: 'Sebastián Barba',
            Email: 'sebastian.barba@bciseguros.com',
            id: '35c5571b-a833-46b1-86bb-b7ec79f4eb23',
        },
        {
            Gerente: 'Camila Rojas',
            Email: 'camilia.rojas@bciseguros.com',
            id: '0709011f-abbf-4bf6-b77c-513d34e3b804',
        },
        {
            Gerente: 'Natalia Valenzuela',
            Email: 'natalia.valenzuela@bciseguros.com',
            id: '7c9b491f-4d25-4d41-a1d5-9d1ce4983e3a',
        },
    ];

    const data: any[] = [
        {
            Gerencia: 'Administración, Finanzas y GGPP',
            Gerente: 'Roberto Haramboure',
            IGerenciaSubGerencia: 'Subgerencia de Finanzas',
            ISubGerenteGerente: 'Luis Gonzalez',
            IIGerenciaSubGerencia: '',
            IISubGerenteGerente: '',
            Area: 'Tesorería',
            ResponsableArea: 'Carlos Villalobos',
            Servicio: 'Emisión de boletas de garantía',
            ResponsableServicio: 'Carlos Villalobos',
            TipoServicio: 'ESI',
        },
        {
            Gerencia: 'Comercial',
            Gerente: 'Rodrigo Heredia',
            IGerenciaSubGerencia: 'Gerencia de Comercialización Digital',
            ISubGerenteGerente: 'Michel Delgado',
            IIGerenciaSubGerencia: 'Subgerencia Canal Digital',
            IISubGerenteGerente: 'Felipe Arancibia',
            Area: 'Canal Digital',
            ResponsableArea: 'Felipe Arancibia',
            Servicio: 'Gestión de ventas Canal Digital',
            ResponsableServicio:
                'Sebastián Barba; Camila Rojas; Natalia Valenzuela',
            TipoServicio: 'ECI',
        },
        {
            Gerencia: 'Administración, Finanzas y GGPP',
            Gerente: 'Roberto Haramboure',
            IGerenciaSubGerencia: 'Subgerencia de Finanzas',
            ISubGerenteGerente: 'Luis Gonzalez',
            IIGerenciaSubGerencia: '',
            IISubGerenteGerente: '',
            Area: 'Tesorería',
            ResponsableArea: 'Carlos Villalobos',
            Servicio: 'Emisión de Pagos',
            ResponsableServicio: 'Carlos Villalobos',
            TipoServicio: 'ECI',
        },
        {
            Gerencia: 'Administración, Finanzas y GGPP',
            Gerente: 'Roberto Haramboure',
            IGerenciaSubGerencia: 'Subgerencia de Finanzas',
            ISubGerenteGerente: 'Luis Gonzalez',
            IIGerenciaSubGerencia: '',
            IISubGerenteGerente: '',
            Area: 'Contabilidad Generales',
            ResponsableArea: 'Ismael Acosta',
            Servicio:
                'Entrega de información para Directorio al 8 día hábil (Siempre y cuando no existan reprocesos o retrasos en la entrega de información desde otras áreas) Cía. Generales',
            ResponsableServicio: 'Ismael Acosta',
            TipoServicio: 'ESI',
        },
        {
            Gerencia: 'Comercial',
            Gerente: 'Rodrigo Heredia',
            IGerenciaSubGerencia: 'Gerencia Banca Seguros',
            ISubGerenteGerente: 'Tomás Soffia',
            IIGerenciaSubGerencia: '',
            IISubGerenteGerente: '',
            Area: 'Banca Seguros',
            ResponsableArea: 'Tomás Soffia',
            Servicio: 'Motivo de cambios de estructura en la Corredora',
            ResponsableServicio: 'Tomás Soffia; Eduardo Grayde',
            TipoServicio: 'ECI',
        },
        {
            Gerencia: 'Comercial',
            Gerente: 'Rodrigo Heredia',
            IGerenciaSubGerencia: 'Gerencia Canal Tradicional',
            ISubGerenteGerente: 'Felipe Correa',
            IIGerenciaSubGerencia: '',
            IISubGerenteGerente: '',
            Area: 'Canal Tradicional - Sucursales',
            ResponsableArea: 'Felipe Correa',
            Servicio: 'Sucursales',
            ResponsableServicio: 'Felipe Correa',
            TipoServicio: 'ECI',
        },
        {
            Gerencia: 'Comercial',
            Gerente: 'Rodrigo Heredia',
            IGerenciaSubGerencia: 'Gerencia de Comercialización Digital',
            ISubGerenteGerente: 'Michel Delgado',
            IIGerenciaSubGerencia: 'Gerencia Sexto Motor',
            IISubGerenteGerente: '',
            Area: 'Sexto Motor',
            ResponsableArea: 'Marcelo Bustos',
            Servicio:
                'Coordinación en conjunto de acciones de sexto motor para upgrades y cruce de ventas de los clientes del canal',
            ResponsableServicio: 'Marcelo Bustos',
            TipoServicio: 'ECI',
        },

        {
            Gerencia: 'Comercial',
            Gerente: 'Rodrigo Heredia',
            IGerenciaSubGerencia: 'Gerencia de Comercialización Digital',
            ISubGerenteGerente: 'Michel Delgado',
            IIGerenciaSubGerencia: '',
            IISubGerenteGerente: '',
            Area: 'Productos y proyectos comerciales',
            ResponsableArea: 'Silvana Landaeta',
            Servicio: 'Nuevos Proyectos Gestión Comercial',
            ResponsableServicio: 'Silvana Landaeta',
            TipoServicio: 'ECI',
        },
        {
            Gerencia: 'Comercial',
            Gerente: 'Rodrigo Heredia',
            IGerenciaSubGerencia: 'Gerencia de Comercialización Digital',
            ISubGerenteGerente: 'Michel Delgado',
            IIGerenciaSubGerencia: '',
            IISubGerenteGerente: '',
            Area: 'Canal Presencial',
            ResponsableArea: 'Jose Manuel Lopez',
            Servicio: 'Canal Presencial',
            ResponsableServicio: 'Jose Manuel Lopez',
            TipoServicio: 'ECI',
        },
        {
            Gerencia: 'Comercial',
            Gerente: 'Rodrigo Heredia',
            IGerenciaSubGerencia: 'Gerencia Ecosistemas',
            ISubGerenteGerente: 'Cristian Castillo',
            IIGerenciaSubGerencia: '',
            IISubGerenteGerente: '',
            Area: 'Masivos y Nuevos Negocios',
            ResponsableArea: 'Cristian Castillo',
            Servicio: 'Ecosistemas',
            ResponsableServicio: 'Cristian Castillo',
            TipoServicio: 'ECI',
        },
        {
            Gerencia: 'Comercial',
            Gerente: 'Rodrigo Heredia',
            IGerenciaSubGerencia: 'Gerencia Líneas Comerciales',
            ISubGerenteGerente: 'José Luis Ortíz',
            IIGerenciaSubGerencia: 'Subgerencia de Suscripción',
            IISubGerenteGerente: 'Mauricio Bravo',
            Area: 'Empresa y Transporte',
            ResponsableArea: 'Mauricio Bravo',
            Servicio: 'Cotizaciones de Negocios de Empresa y Transporte',
            ResponsableServicio: 'Mauricio Bravo',
            TipoServicio: 'ECI',
        },
    ];

    usuarios.forEach(async (u) => {
        // await containerPersonas.items.create({
        //     id: u.id,
        //     name: u.Gerente,
        //     email: u.Email,
        //     rol: 'user',
        //     compania: 'bciseguros',
        //     password: '123',
        //     avatar: 'assets/images/avatars/brian-hughes.jpg',
        //     status: 'online',
        // });
    });

    const gerenciasU = [...new Set(data.map((item) => item.Gerencia))];

    gerenciasU.forEach(async (i) => {
        const filasGerencia = data.filter((t) => t.Gerencia == i);

        // const usuarioGerente = usuarios.find(
        //     (u) => u.Gerente == filasGerencia[0].Gerente
        // );
        let gerencia: Gerencia = {
            id: getGuid(),
            nombre: i,
            empresa: 'bci',
            gerenciasrd: [],
            // responsable: {
            //     id: usuarioGerente.id,
            //     name: usuarioGerente.name,
            //     email: usuarioGerente.email,
            // },
        };

        const subGerenciasU = [
            ...new Set(filasGerencia.map((item) => item.IGerenciaSubGerencia)),
        ];

        subGerenciasU.forEach((sg) => {
            let subgerencia: Subgerencia = {
                id: getGuid(),
                nombre: sg,
                areas: [],
            };

            const filasSubGerencia = data.filter(
                (t) => t.Gerencia == i && t.IGerenciaSubGerencia == sg
            );

            const subSubGerenciasU = [
                ...new Set(
                    filasSubGerencia.map((item) => item.IIGerenciaSubGerencia)
                ),
            ];

            if (
                subSubGerenciasU.length == 1 &&
                subSubGerenciasU[0].length == 0
            ) {
                // no tiene subsubgerencia
                const areasUnicas = [
                    ...new Set(filasSubGerencia.map((item) => item.Area)),
                ];

                areasUnicas.forEach((cadaArea) => {
                    let area: Area = {
                        id: getGuid(),
                        nombre: cadaArea,
                        servicios: [],
                    };

                    const filasArea = data.filter(
                        (t) =>
                            t.Gerencia == i &&
                            t.IGerenciaSubGerencia == sg &&
                            t.Area == cadaArea
                    );

                    filasArea.forEach((cadaFilaArea) => {
                        let servicio: Servicio = {
                            id: getGuid(),
                            nombre: cadaFilaArea.Servicio,
                            tipo: cadaFilaArea.TipoServicio,
                        };
                        area.servicios.push(servicio);
                    });

                    subgerencia.areas.push(area);
                });
            } else {
                //tiene subsubgerencia
                subSubGerenciasU.forEach((ssg) => {
                    const filasSubSubGerencia = data.filter(
                        (t) =>
                            t.Gerencia == i &&
                            t.IGerenciaSubGerencia == sg &&
                            t.IIGerenciaSubGerencia == ssg
                    );
                    const subSubGerenciasU = [
                        ...new Set(
                            filasSubSubGerencia.map(
                                (item) => item.IIGerenciaSubGerencia
                            )
                        ),
                    ];

                    subSubGerenciasU.forEach((cadaSubSubU) => {
                        let subsubGerencia: Subgerencia = {
                            id: getGuid(),
                            nombre: cadaSubSubU,
                            areas: [],
                        };

                        const areasUnicas = [
                            ...new Set(
                                filasSubSubGerencia.map((item) => item.Area)
                            ),
                        ];

                        areasUnicas.forEach((cadaArea) => {
                            let area: Area = {
                                id: getGuid(),
                                nombre: cadaArea,
                                servicios: [],
                            };

                            const filasArea = data.filter(
                                (t) =>
                                    t.Gerencia == i &&
                                    t.IGerenciaSubGerencia == sg &&
                                    t.IISubGerenteGerente == ssg &&
                                    t.Area == cadaArea
                            );

                            filasArea.forEach((cadaFilaArea) => {
                                let servicio: Servicio = {
                                    id: getGuid(),
                                    nombre: cadaFilaArea.Servicio,
                                    tipo: cadaFilaArea.TipoServicio,
                                };
                                area.servicios.push(servicio);
                            });
                            subsubGerencia.areas.push(area);
                        });

                        // subgerencia..push(subsubGerencia);
                    });
                });
            }

            gerencia.gerenciasrd.push(subgerencia);
        });

        await containerGerencia.items.create(gerencia);
    });
};

export default httpTrigger;
