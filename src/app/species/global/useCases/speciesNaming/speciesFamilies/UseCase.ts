import type SpeciesFamiliesUseCaseInterface from './UseCaseInterface';
import Result from '../../../../../utils/useCasesResult/Result';
import SpeciesFamiliesServices from '../../../services/speciesNaming/speciesFamilies/Service';
import SpeciesFamily from '../../../entities/SpeciesFamily';
import UseCaseError from '../../../../../utils/useCasesResult/types/UseCaseError';

export default class SpeciesFamiliesUseCase implements SpeciesFamiliesUseCaseInterface {
	async getTotalSpeciesFamilies(jwt: string): Promise<Result> {
		let result: Result = new Result()
		const speciesFamiliesService: SpeciesFamiliesServices = new SpeciesFamiliesServices()

		const totalSpeciesFamilies: number | null = await speciesFamiliesService.queryTotalSpeciesFamilies(jwt)

		if (totalSpeciesFamilies === null) {
			result.addError('Query failed', 400)
			return result
		}

		result.content = totalSpeciesFamilies
		result.addSuccess("Query is ok", 200)
		return result
	}

	async getListOfSpeciesFamilies(jwt:string, filters: object): Promise<Result>{
		let result: Result = new Result()
		const speciesFamiliesService: SpeciesFamiliesServices = new SpeciesFamiliesServices()

		const listOfSpeciesFamilies: Array<SpeciesFamily> | UseCaseError = await speciesFamiliesService.queryListOfSpeciesFamilies(jwt, filters)

		if (listOfSpeciesFamilies instanceof UseCaseError) {
			result.addError('Query failed', 400)
			return result
		}

		result.content = listOfSpeciesFamilies
		result.addSuccess("Query is ok", 200)
		return result

	}

}