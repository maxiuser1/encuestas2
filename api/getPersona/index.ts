import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  item: any
): Promise<void> {
  if (item && item[0]?.id) {
    context.res = {
      body: item[0],
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } else {
    context.res = {
      status: 404,
    };
  }
};

export default httpTrigger;
