import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    context.bindings.encuesta = req.body;
    context.res = {
        status: 201,
        body: req.body,
    };

    context.done();
};

export default httpTrigger;
