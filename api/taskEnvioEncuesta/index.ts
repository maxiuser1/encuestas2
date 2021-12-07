import { AzureFunction, Context } from '@azure/functions';

const sendGrid: AzureFunction = async function (
    context: Context,
    order: any
): Promise<void> {
    context.bindings.message = {
        personalizations: [{ to: [{ email: 'nocompila@hotmail.com' }] }],
        subject: `Thanks for your order`,
        content: [
            {
                type: 'text/plain',
                value: `is being processed!`,
            },
        ],
    };
};

export default sendGrid;
