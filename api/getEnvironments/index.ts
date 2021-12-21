import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
    const connect =
        process.env['ConnectionStrings:CosmosDBConnection'] ??
        process.env['CosmosDBConnection'];
    const envi = process.env['envi'] ?? process.env['envi'];
    const responseMessage = `env ${envi} connect ${connect}`;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage,
    };
};

export default httpTrigger;
