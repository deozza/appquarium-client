import UseCaseError from "../../../utils/useCasesResult/types/UseCaseError";
import Species from "../entities/Species";
import SpeciesFamily from "../entities/SpeciesFamily";
import SpeciesGenre from "../entities/SpeciesGenre";

export default interface SpeciesAdapterInterface {
    queryTotalSpecies(): Promise<number | null>

    queryTotalSpeciesOrigins(): Promise<number | null>

    queryListOfSpecies(): Promise<Array<Species> | UseCaseError>

    queryGetSpecies(genre: string, name: string): Promise<Species | UseCaseError>

    queryListOfSpeciesCategories(): Promise<Array<string> | UseCaseError>

    queryListOfSpeciesFamiliesByCategory(category: string): Promise<Array<SpeciesFamily> | UseCaseError>

    queryListOfSpeciesGenresByCategory(category: string): Promise<Array<SpeciesGenre> | UseCaseError>

    queryListOfSpeciesOrigins(): Promise<Array<string> | UseCaseError>

    queryListOfSpeciesByCategory(category: string): Promise<Array<Species> | UseCaseError>
}
