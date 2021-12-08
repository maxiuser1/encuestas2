import { AzureFunction, Context } from '@azure/functions';

const sendGrid: AzureFunction = async function (
    context: Context,
    order: any
): Promise<void> {
    console.log('envio', order);
    context.bindings.message = {
        personalizations: [
            {
                to: [
                    {
                        email: order.email,
                    },
                ],
                dynamic_template_data: {
                    name: order.name,
                    token: order.id,
                },
            },
        ],
        template_id: 'd-c173326b8a04436db1d9c0ba141490dd',
    };
};

export default sendGrid;
