import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  item: any
): Promise<void> {
  context.res = {
    headers: { 'Content-Type': 'application/json' },
    body: item,
  };
};

export default httpTrigger;
