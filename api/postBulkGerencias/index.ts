import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { CosmosClient } from '@azure/cosmos';
import { getGuid } from '../common/Utils';
import { Area, Gerencia, Servicio, Subgerencia } from '../model/gerencia';
import { getuid } from 'process';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
    // const client = new CosmosClient(
    //     'AccountEndpoint=https://encuestasdb.documents.azure.com:443/;AccountKey=jbUfTnFcRnprj1rKnuMxQXBsiJr4ph2MTxdyDWhKYHNZe0z0Et6ecKIkKnVOcY8uaWBTiPDG3BjBetDtj7lfpA=='
    // );
    // const containerGerencia = await client
    //     .database('organizacion')
    //     .container('gerencias');
    // const containerPersonas = await client
    //     .database('organizacion')
    //     .container('personas');
    // data.responsables.forEach(async (u) => {
    //     await containerPersonas.items.create({
    //         id: u.id,
    //         name: `${u.nombres} ${u.apellidoPaterno} ${u.apellidoMaterno}`,
    //         email: u.correo,
    //         rol: 'user',
    //         cargo: u.cargo,
    //         compania: 'bciseguros',
    //         password: '123',
    //         avatar: 'assets/images/avatars/brian-hughes.jpg',
    //         status: 'online',
    //     });
    // });
    // data.gerencias.forEach(async(u) => {
    //     await containerGerencia.items.create({
    //         id: u.id,
    //         name: `${u.nombres} ${u.apellidoPaterno} ${u.apellidoMaterno}`,
    //         email: u.correo,
    //         rol: 'user',
    //         cargo: u.cargo,
    //         compania: 'bciseguros',
    //         password: '123',
    //         avatar: 'assets/images/avatars/brian-hughes.jpg',
    //         status: 'online',
    //     });
    // });
};

export default httpTrigger;
