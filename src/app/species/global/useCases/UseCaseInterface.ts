import Result from "../../../utils/useCasesResult/Result";
import Constraints from '../../../adapters/hasura/HasuraRequestBuilderV2/Constraints';
import Species from '../entities/Species';

export default interface SpeciesUseCaseInterface {
    getTotalSpecies(jwt: string): Promise<Result>

    getTotalSpeciesOrigins(jwt: string): Promise<Result>

    getListOfSpecies(jwt: string, speciesConstraints: Constraints): Promise<Result>

    getListOfSpeciesOrigins(jwt: string): Promise<Result>

    getListSpeciesCategories(jwt: string): Promise<Result>

    getSpecies(jwt: string, speciesConstraints: Constraints ): Promise<Result>

    getSpeciesByUuid(jwt: string, uuid: string): Promise<Result>

    checkSpeciesCompatibility(speciesLeft: Species, speciesRight: Species): Result
}
