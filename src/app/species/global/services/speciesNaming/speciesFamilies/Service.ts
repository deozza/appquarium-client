import type SpeciesFamiliesServiceInterface from './ServiceInterface';
import type SpeciesFamiliesAdapterInterface from '../../../adapters/speciesNaming/speciesFamilies/AdapterInterface';
import SpeciesFamiliesHasuraAdapter from '../../../adapters/speciesNaming/speciesFamilies/HasuraAdapter';
import SpeciesFamily from '../../../entities/SpeciesFamily';
import UseCaseError from '../../../../../utils/useCasesResult/types/UseCaseError';

export default class SpeciesFamiliesService implements SpeciesFamiliesServiceInterface{
	async queryTotalSpeciesFamilies(jwt: string): Promise<number | null> {
		const adapter: SpeciesFamiliesAdapterInterface = new SpeciesFamiliesHasuraAdapter(jwt)

		return await adapter.queryTotalSpeciesFamilies()
	}

	async queryListOfSpeciesFamilies(jwt: string, filters: object): Promise<Array<SpeciesFamily> | UseCaseError>{
		const adapter: SpeciesFamiliesAdapterInterface = new SpeciesFamiliesHasuraAdapter(jwt)

		return await adapter.queryListOfSpeciesFamilies(filters)
	}

}