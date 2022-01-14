import type SpeciesGenresAdapterInterface from '../../../adapters/speciesNaming/speciesGenres/AdapterInterface';
import type SpeciesGenresServiceInterface from './ServiceInterface';
import UseCaseError from '../../../../../utils/useCasesResult/types/UseCaseError';
import SpeciesGenre from '../../../entities/SpeciesGenre';
import SpeciesGenresHasuraAdapter from '../../../adapters/speciesNaming/speciesGenres/HasuraAdapter';

export default class SpeciesGenresService implements SpeciesGenresServiceInterface{

	async queryListOfSpeciesGenres(jwt: string, filters: object): Promise<Array<SpeciesGenre> | UseCaseError>{
		const adapter: SpeciesGenresAdapterInterface = new SpeciesGenresHasuraAdapter(jwt)

		return await adapter.queryListOfSpeciesGenres(filters)
	}

}