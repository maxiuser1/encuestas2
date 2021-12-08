import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getGuid } from '../common/Utils';
import { Respuestas } from '../core/services/respuestas';
import {
    Area,
    Evaluacion,
    Gerencia,
    Gerenciard,
    Respuesta,
    Servicio,
    Subgerencia,
} from '../model/gerencia';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest,
    gerencias: any,
    encuesta: any
): Promise<void> {
    const respuestasService = new Respuestas();
    let respuestas: Respuesta[] = respuestasService.getResults(
        gerencias,
        encuesta,
        req.body
    );

    context.res = {
        body: { cantidad: respuestas.length },
    };

    context.bindings.respuestas = [];
    for (let cadaRespuesta of respuestas) {
        context.bindings.respuestas.push(cadaRespuesta);
    }
    context.done();
};

export default httpTrigger;
