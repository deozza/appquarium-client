import type SpeciesFamiliesUseCaseInterface from './UseCaseInterface';
import Result from '../../../../../utils/useCasesResult/Result';
import SpeciesNamingServices from '../../../services/speciesNaming/speciesFamilies/Service';

export default class SpeciesFamiliesUseCase implements SpeciesFamiliesUseCaseInterface {
	async getTotalSpeciesFamilies(jwt: string): Promise<Result> {
		let result: Result = new Result()
		const speciesNamingService: SpeciesNamingServices = new SpeciesNamingServices()

		const totalSpeciesFamilies: number | null = await speciesNamingService.queryTotalSpeciesFamilies(jwt)

		if (totalSpeciesFamilies === null) {
			result.addError('Query failed', 400)
			return result
		}

		result.content = totalSpeciesFamilies
		result.addSuccess("Query is ok", 200)
		return result
	}

}