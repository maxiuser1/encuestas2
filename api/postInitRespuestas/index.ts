import { CosmosClient } from '@azure/cosmos';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import {
    Area,
    Gerencia,
    Gerenciard,
    Respuesta,
    Servicio,
    Subgerencia,
} from '../model/gerencia';

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

    const { resources: itemsGerencias } = await containerGerencia.items
        .readAll()
        .fetchAll();
    const { resources: itemsPersonas } = await containerPersonas.items
        .readAll()
        .fetchAll();

    let respuestas: Respuesta[] = [];

    for (const gerencia of itemsGerencias as Array<Gerencia>) {
        for (const gerenciaRd of gerencia.gerenciasrd as Array<Gerenciard>) {
            for (const subgerencia of gerenciaRd.subgerencias as Array<Subgerencia>) {
                for (const area of subgerencia.areas as Array<Area>) {
                    const servicios = area.servicios;
                    procesarServicio(
                        servicios,
                        gerencia,
                        gerenciaRd,
                        subgerencia,
                        area
                    );
                }

                const servicios = subgerencia.servicios;
                procesarServicio(
                    servicios,
                    gerencia,
                    gerenciaRd,
                    subgerencia,
                    null
                );
            }

            for (const area of gerenciaRd.areas as Array<Area>) {
                for (const servicio of area.servicios as Array<Servicio>) {
                    respuestas.push({
                        id: `${gerencia.nombre} ${gerenciaRd.nombre}  ${area.nombre} ${servicio.nombre}`,
                    });
                }
            }
        }

        for (const subgerencia of gerencia.subgerencias as Array<Subgerencia>) {
            for (const area of subgerencia.areas as Array<Area>) {
                for (const servicio of area.servicios as Array<Servicio>) {
                    respuestas.push({
                        id: `${gerencia.nombre} ${subgerencia.nombre} ${area.nombre} ${servicio.nombre}`,
                    });
                }
            }

            for (const servicio of subgerencia.servicios as Array<Servicio>) {
                respuestas.push({
                    id: `${gerencia.nombre} ${subgerencia.nombre}  ${servicio.nombre}`,
                });
            }
        }

        for (const area of gerencia.areas as Array<Area>) {
            for (const servicio of area.servicios as Array<Servicio>) {
                respuestas.push({
                    id: `${gerencia.nombre}  ${area.nombre} ${servicio.nombre}`,
                });
            }
        }
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { respuestas, cantidad: respuestas.length },
    };

    function procesarServicio(
        servicios: Servicio[],
        gerencia: Gerencia,
        gerenciaRd: Gerenciard,
        subgerencia: Subgerencia,
        area: Area
    ) {
        for (const servicio of servicios as Array<Servicio>) {
            respuestas.push({
                id: `${gerencia.nombre} ${gerenciaRd.nombre} ${subgerencia.nombre} ${area?.nombre} ${servicio.nombre}`,
            });
        }
    }
};

export default httpTrigger;
