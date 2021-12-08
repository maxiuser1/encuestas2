import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest,
    respuestas: any
): Promise<void> {
    context.bindings.outputSbQueue = [];
    for (let cadaRespuesta of respuestas) {
        context.bindings.outputSbQueue.push(cadaRespuesta);
    }
};

export default httpTrigger;
