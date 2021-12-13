import { CosmosClient, FeedOptions, QueryIterator } from '@azure/cosmos';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { result } from 'lodash';

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {
    const client = new CosmosClient(
        process.env['ConnectionStrings:CosmosDBConnection'] ??
            process.env['CosmosDBConnection']
    );
    const database = await client.database('organizacion');
    const container = await database.container('personas');

    let options: FeedOptions = {
        maxItemCount: 10,
        partitionKey: 'bciseguros',
    };

    if (req.body.continuationToken) {
        options.continuationToken = req.body.continuationToken;
    }

    const results = await container.items
        .query('select c.id, c.name, c.email from c order by c.name', options)
        .fetchNext();

    context.res = {
        body: {
            items: results,
            // continuation: results.continuation,
            // hasMoreItems: results.hasMoreResults,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

export default httpTrigger;
