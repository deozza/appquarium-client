import SpeciesFamily from '../../../entities/SpeciesFamily';
import UseCaseError from '../../../../../utils/useCasesResult/types/UseCaseError';

export default interface SpeciesFamiliesAdapterInterface{
	queryTotalSpeciesFamilies(): Promise<number | null>
	queryListOfSpeciesFamilies(filters: object): Promise<Array<SpeciesFamily> | UseCaseError>
}