import UseCaseError from '../../../../../utils/useCasesResult/types/UseCaseError';
import SpeciesGenre from '../../../entities/SpeciesGenre';

export default interface SpeciesGenresAdapterInterface{
	queryListOfSpeciesGenres(filters: object): Promise<Array<SpeciesGenre> | UseCaseError>
}