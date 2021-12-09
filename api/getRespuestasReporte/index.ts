import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest,
    items: any
): Promise<void> {
    context.res = {
        body: items,
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

export default httpTrigger;
