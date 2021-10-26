import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest,
    item: any
): Promise<void> {
    context.res = {
        body: item,
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

export default httpTrigger;
