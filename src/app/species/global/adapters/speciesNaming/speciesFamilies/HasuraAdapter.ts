import HasuraClient from '../../../../../adapters/hasura/HasuraClient';
import type SpeciesFamiliesAdapterInterface from './AdapterInterface';
import Query from '../../../../../adapters/hasura/HasuraRequestBuilderV2/Query';
import UseCaseError from '../../../../../utils/useCasesResult/types/UseCaseError';
import SpeciesFamily from '../../../entities/SpeciesFamily';

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

	async queryListOfSpeciesFamilies(filters: object): Promise<Array<SpeciesFamily> | UseCaseError>{
		const queryBuilder: Query = new Query('query')
			.addReturnToQuery(new Query('species_family')
				.addReturnToQuery('name'))

		const query: string = queryBuilder.buildQuery()

		try {
			const data = await this.client.request(query)
			const listOfSpeciesFamilies: Array<SpeciesFamily> = data.species_family.map((item: Array<string>) => new SpeciesFamily(item))
			return listOfSpeciesFamilies
		} catch (e) {
			if (e.message.includes("JWTExpired")) {
				return new UseCaseError("JWT expired", 401)
			}
			return new UseCaseError(e.message, 400)
		}
	}
}