import UseCaseError from "../../../utils/useCasesResult/types/UseCaseError";
import Species from "../entities/Species";
import Constraints from '../../../adapters/hasura/HasuraRequestBuilderV2/Constraints';

export default interface SpeciesAdapterInterface {
    queryTotalSpecies(): Promise<number | null>

    queryTotalSpeciesOrigins(): Promise<number | null>

    queryGetSpecies(speciesConstraints: Constraints): Promise<Species | UseCaseError>

    queryListOfSpecies(speciesConstraints: Constraints): Promise<Array<Species> | UseCaseError>

    queryListOfSpeciesCategories(): Promise<Array<string> | UseCaseError>

    queryListOfSpeciesOrigins(): Promise<Array<string> | UseCaseError>
}
