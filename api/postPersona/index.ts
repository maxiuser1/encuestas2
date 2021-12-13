import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getGuid } from '../common/Utils';
import { Persona } from '../model/gerencia';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
    const personaVm = req.body as Persona;
    const persona: Persona = {
        ...personaVm,
        id: getGuid(),
        compania: 'bciseguros',
    };
    context.bindings.persona = persona;
    context.res = {
        status: 201,
        body: persona,
    };
    context.done();
};

export default httpTrigger;
