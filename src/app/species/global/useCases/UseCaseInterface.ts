import Result from "../../../utils/useCasesResult/Result";
import Constraints from '../../../adapters/hasura/HasuraRequestBuilderV2/Constraints';

export default interface SpeciesUseCaseInterface {
    getTotalSpecies(jwt: string): Promise<Result>

    getTotalSpeciesOrigins(jwt: string): Promise<Result>

    getListOfSpecies(jwt: string, speciesConstraints: Constraints): Promise<Result>

    getSpeciesOrigins(jwt: string): Promise<Result>

    getSpecies(jwt: string, genre: string, name: string): Promise<Result>
}
