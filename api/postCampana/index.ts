import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getGuid } from '../common/Utils';
import { Campana } from '../model/gerencia';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
    const campanaVm = req.body as Campana;
    const campana: Campana = { ...campanaVm, id: getGuid() };
    context.bindings.campana = campana;
    context.res = {
        status: 201,
        body: campana,
    };

    context.done();
};

export default httpTrigger;
