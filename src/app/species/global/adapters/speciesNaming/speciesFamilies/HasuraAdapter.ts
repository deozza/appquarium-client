import HasuraClient from '../../../../../adapters/hasura/HasuraClient';
import type SpeciesFamiliesAdapterInterface from './AdapterInterface';
import HasuraQueryBuilder from '../../../../../adapters/hasura/HasuraRequestBuilder/HasuraQueryBuilder';
import Query from '../../../../../adapters/hasura/HasuraRequestBuilderV2/Query';

export default class SpeciesFamiliesHasuraAdapter extends HasuraClient implements SpeciesFamiliesAdapterInterface {
	async queryTotalSpeciesFamilies(): Promise<number | null> {

		const queryBuilder: Query = new Query('query')
			.addReturnToQuery(new Query('species_family_aggregate')
				.addReturnToQuery(new Query('aggregate')
					.addReturnToQuery('count')
				)
			)

		const query: string = queryBuilder.buildQuery()

		try {
			const data = await this.client.request(query)
			const totalSpeciesFamilies: number = data.species_family_aggregate.aggregate.count
			return totalSpeciesFamilies
		} catch (e) {
			return null
		}
	}
}