import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { keys } from 'lodash';
import { Respuesta } from '../model/gerencia';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest,
    items: any
): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    context.res = {
        body: items,
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

export default httpTrigger;
