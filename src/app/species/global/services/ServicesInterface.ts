import UseCaseError from "../../../utils/useCasesResult/types/UseCaseError";
import Species from "../entities/Species";
import Constraints from '../../../adapters/hasura/HasuraRequestBuilderV2/Constraints';

export default interface SpeciesServicesInterface {
    queryTotalSpecies(jwt: string): Promise<number | null>

    queryTotalSpeciesOrigins(jwt: string): Promise<number | null>

    queryGetSpecies(jwt: string, genre: string, name: string): Promise<Species | UseCaseError>

    queryListOfSpecies(jwt: string, speciesConstraints: Constraints): Promise<Array<Species> | UseCaseError>

    querySpeciesCategories(jwt: string): Promise<Array<string> | UseCaseError>

    querySpeciesOrigins(jwt: string): Promise<Array<string> | UseCaseError>
}
