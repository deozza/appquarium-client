import SpeciesFamily from '../../../entities/SpeciesFamily';
import UseCaseError from '../../../../../utils/useCasesResult/types/UseCaseError';

export default interface SpeciesFamiliesServiceInterface {
	queryTotalSpeciesFamilies(jwt: string): Promise<number | null>
	queryListOfSpeciesFamilies(jwt: string, filters: object): Promise<Array<SpeciesFamily> | UseCaseError>
}