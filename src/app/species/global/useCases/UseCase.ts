import type UseCaseInterface from "./UseCaseInterface";

import Result from "../../../utils/useCasesResult/Result";
import UseCaseError from "../../../utils/useCasesResult/types/UseCaseError";

import Species from "../entities/Species";

import Services from "../services/Services";

export default class SpeciesUseCase implements UseCaseInterface {
    async getTotalSpecies(jwt: string): Promise<Result> {
        let result: Result = new Result()
        const speciesService: Services = new Services()

        const totalSpecies: number | null = await speciesService.queryTotalSpecies(jwt)

        if (totalSpecies === null) {
            result.addError('Query failed', 400)
            return result
        }

        result.content = totalSpecies
        result.addSuccess("Query is ok", 200)
        return result
    }

    async getSpecies(jwt: string, genre: string, name: string): Promise<Result> {
        let result: Result = new Result()
        const speciesService: Services = new Services()

        let species: Species | UseCaseError = await speciesService.queryGetSpecies(jwt, genre, name)

        if (species instanceof UseCaseError) {
            if (species.code === 400) {
                result.addError('Query failed', species.code)
                return result
            }

            if (species.code === 404) {
                result.addError('Species not found', species.code)
                return result
            }
        }

        result.content = species
        result.addSuccess("Query is ok", 200)
        return result
    }

    async getListOfSpecies(jwt: string): Promise<Result> {
        let result: Result = new Result()
        const speciesService: Services = new Services()

        const listOfSpecies: Array<Species> | UseCaseError = await speciesService.queryListOfSpecies(jwt)

        if (listOfSpecies instanceof UseCaseError) {
            result.errors.push(listOfSpecies)
            return result
        }

        result.content = listOfSpecies
        result.addSuccess("Query is ok", 200)
        return result
    }

    async getSpeciesCategories(jwt: string): Promise<Result> {
        let result: Result = new Result()
        const speciesService: Services = new Services()

        const speciesCategories: Array<string> | UseCaseError = await speciesService.querySpeciesCategories(jwt)

        if (speciesCategories instanceof UseCaseError) {
            result.errors.push(speciesCategories)
            return result
        }

        result.content = speciesCategories
        result.addSuccess("Query is ok", 200)
        return result
    }

    async getSpeciesOrigins(jwt: string): Promise<Result> {
        let result: Result = new Result()
        const speciesService: Services = new Services()

        const speciesOrigins: Array<string> | UseCaseError = await speciesService.querySpeciesOrigins(jwt)

        if (speciesOrigins instanceof UseCaseError) {
            result.errors.push(speciesOrigins)
            return result
        }

        result.content = speciesOrigins
        result.addSuccess("Query is ok", 200)
        return result
    }
}
