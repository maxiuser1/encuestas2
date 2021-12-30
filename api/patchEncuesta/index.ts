import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest,
    item: any
): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    context.bindings.updatedEncuesta = req.body;
    context.res = {
        body: req.body,
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

export default httpTrigger;
