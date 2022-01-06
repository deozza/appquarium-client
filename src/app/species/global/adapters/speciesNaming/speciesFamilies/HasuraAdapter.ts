import HasuraClient from '../../../../../adapters/hasura/HasuraClient';
import type SpeciesFamiliesAdapterInterface from './AdapterInterface';
import HasuraQueryBuilder from '../../../../../adapters/hasura/HasuraRequestBuilder/HasuraQueryBuilder';

export default class SpeciesFamiliesHasuraAdapter extends HasuraClient implements SpeciesFamiliesAdapterInterface {
	async queryTotalSpeciesFamilies(): Promise<number | null> {

		let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species_family_aggregate')
		queryBuilder.addReturn('aggregate {count}')
		const query: string = queryBuilder.getRequest()

		try {
			const data = await this.client.request(query)
			const totalSpeciesFamilies: number = data.species_family_aggregate.aggregate.count
			return totalSpeciesFamilies
		} catch (e) {
			return null
		}
	}
}