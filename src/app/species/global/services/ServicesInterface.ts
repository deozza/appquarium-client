import UseCaseError from "../../../utils/useCasesResult/types/UseCaseError";
import Species from "../entities/Species";

export default interface ServicesInterface {
    queryTotalSpecies(jwt: string): Promise<number | null>

    queryGetSpecies(jwt: string, genre: string, name: string): Promise<Species | UseCaseError>

    queryListOfSpecies(jwt: string): Promise<Array<Species> | UseCaseError>

    querySpeciesCategories(jwt: string): Promise<Array<string> | UseCaseError>

    querySpeciesOrigins(jwt: string): Promise<Array<string> | UseCaseError>
}
