import Result from '../../../../../utils/useCasesResult/Result';

export default interface SpeciesGenresUseCaseInterface {
	getListOfSpeciesGenres(jwt: string, filters: object): Promise<Result>
}
