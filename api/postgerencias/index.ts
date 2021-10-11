import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getGuid } from '../common/Utils';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const todoItem = {
    id: getGuid(),
    nombre: 'test',
    apellido: 'test2',
    compania: 'bci',
  };

  context.bindings.gerencia = todoItem;
  context.res = {
    status: 201,
    body: '',
  };

  context.done();
};

export default httpTrigger;
