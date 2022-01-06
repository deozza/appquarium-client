import type SpeciesServicesInterface from "./ServicesInterface";

import UseCaseError from "../../../utils/useCasesResult/types/UseCaseError";
import Species from "../entities/Species";

import type AdapterInterface from "../adapters/AdapterInterface";
import SpeciesAdapterInterface from "../adapters/HasuraAdapter";

export default class SpeciesServices implements SpeciesServicesInterface {

    async queryTotalSpecies(jwt: string): Promise<number | null> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryTotalSpecies()
    }

    async queryTotalSpeciesOrigins(jwt: string): Promise<number | null> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryTotalSpeciesOrigins()
    }

    async queryListOfSpecies(jwt: string): Promise<Array<Species> | UseCaseError> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryListOfSpecies()
    }

    async queryGetSpecies(jwt: string, genre: string, name: string): Promise<Species | UseCaseError> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryGetSpecies(genre, name)
    }

    async querySpeciesCategories(jwt: string): Promise<Array<string> | UseCaseError> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryListOfSpeciesCategories()
    }

    async querySpeciesOrigins(jwt: string): Promise<Array<string> | UseCaseError> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryListOfSpeciesOrigins()
    }
}
