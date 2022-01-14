import type SpeciesGenresAdapterInterface from './AdapterInterface';

import HasuraClient from '../../../../../adapters/hasura/HasuraClient';
import Query from '../../../../../adapters/hasura/HasuraRequestBuilderV2/Query';
import UseCaseError from '../../../../../utils/useCasesResult/types/UseCaseError';
import SpeciesGenre from '../../../entities/SpeciesGenre';

export default class SpeciesGenresHasuraAdapter extends HasuraClient implements SpeciesGenresAdapterInterface {
	async queryListOfSpeciesGenres(filters: object): Promise<Array<SpeciesGenre> | UseCaseError>{
		const queryBuilder: Query = new Query('query')
			.addReturnToQuery(new Query('species_genre')
				.addReturnToQuery('name'))

		const query: string = queryBuilder.buildQuery()

		try {
			const data = await this.client.request(query)
			const listOfSpeciesGenres: Array<SpeciesGenre> = data.species_genre.map((item: Array<string>) => new SpeciesGenre(item))
			return listOfSpeciesGenres
		} catch (e) {
			if (e.message.includes("JWTExpired")) {
				return new UseCaseError("JWT expired", 401)
			}
			return new UseCaseError(e.message, 400)
		}
	}
}