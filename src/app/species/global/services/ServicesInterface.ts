import UseCaseError from "../../../utils/useCasesResult/types/UseCaseError";
import Species from "../entities/Species";
import Constraints from '../../../adapters/hasura/HasuraRequestBuilderV2/Constraints';

export default interface SpeciesServicesInterface {
    queryTotalSpecies(jwt: string): Promise<number | null>

    queryTotalSpeciesOrigins(jwt: string): Promise<number | null>

    queryGetSpecies(jwt: string, speciesConstraints: Constraints): Promise<Species | UseCaseError>

    queryGetSpeciesByUuid(jwt: string, uuid: string): Promise<Species | UseCaseError>

    queryListOfSpecies(jwt: string, speciesConstraints: Constraints): Promise<Array<Species> | UseCaseError>

    queryListOfSpeciesCategories(jwt: string): Promise<Array<string> | UseCaseError>

    queryListOfSpeciesOrigins(jwt: string): Promise<Array<string> | UseCaseError>

    checkSpeciesCompatibility(speciesLeft: Species, speciesRight: Species): null | object
}
