import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getGuid } from '../common/Utils';
import { Gerencia } from '../model/gerencia';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const gerenciaVm = req.body as Gerencia;

  const gerencia: Gerencia = {
    id: getGuid(),
    nombre: gerenciaVm.nombre,
    gerente: gerenciaVm.gerente,
    empresa: 'bci seguros',
  };
  context.bindings.gerencia = gerencia;
  context.res = {
    status: 201,
    body: gerencia,
  };

  context.done();
};

export default httpTrigger;
