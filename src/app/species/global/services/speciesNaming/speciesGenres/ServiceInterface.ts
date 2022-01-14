import UseCaseError from '../../../../../utils/useCasesResult/types/UseCaseError';

class SpeciesGenres {
}

export default interface SpeciesGenresServiceInterface {
	queryListOfSpeciesGenres(jwt: string, filters: object): Promise<Array<SpeciesGenres> | UseCaseError>
}