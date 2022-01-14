import type SpeciesGenresUseCaseInterface from './UseCaseInterface';

import Result from '../../../../../utils/useCasesResult/Result';
import SpeciesGenreService from '../../../services/speciesNaming/speciesGenres/Service';
import SpeciesFamily from '../../../entities/SpeciesFamily';
import UseCaseError from '../../../../../utils/useCasesResult/types/UseCaseError';

export default class SpeciesGenresUseCase implements SpeciesGenresUseCaseInterface {

	async getListOfSpeciesGenres(jwt:string, filters: object): Promise<Result>{
		let result: Result = new Result()
		const speciesGenresService: SpeciesGenreService = new SpeciesGenreService()

		const listOfSpeciesGenres: Array<SpeciesFamily> | UseCaseError = await speciesGenresService.queryListOfSpeciesGenres(jwt, filters)

		if (listOfSpeciesGenres instanceof UseCaseError) {
			result.addError('Query failed', 400)
			return result
		}

		result.content = listOfSpeciesGenres
		result.addSuccess("Query is ok", 200)
		return result
	}

}