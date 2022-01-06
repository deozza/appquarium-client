import Result from "../../../utils/useCasesResult/Result";

export default interface SpeciesUseCaseInterface {
    getTotalSpecies(jwt: string): Promise<Result>

    getTotalSpeciesOrigins(jwt: string): Promise<Result>

    getListOfSpecies(jwt: string): Promise<Result>

    getSpeciesOrigins(jwt: string): Promise<Result>

    getSpecies(jwt: string, genre: string, name: string): Promise<Result>
}
