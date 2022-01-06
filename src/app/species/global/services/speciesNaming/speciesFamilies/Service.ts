import type SpeciesFamiliesServiceInterface from './ServiceInterface';
import type SpeciesFamiliesAdapterInterface from '../../../adapters/speciesNaming/speciesFamilies/AdapterInterface';
import SpeciesFamiliesHasuraAdapter from '../../../adapters/speciesNaming/speciesFamilies/HasuraAdapter';

export default class SpeciesFamiliesService implements SpeciesFamiliesServiceInterface{
	async queryTotalSpeciesFamilies(jwt: string): Promise<number | null> {
		const adapter: SpeciesFamiliesAdapterInterface = new SpeciesFamiliesHasuraAdapter(jwt)

		return await adapter.queryTotalSpeciesFamilies()
	}

}