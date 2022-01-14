import type SpeciesServicesInterface from "./ServicesInterface";

import UseCaseError from "../../../utils/useCasesResult/types/UseCaseError";
import Species from "../entities/Species";

import type AdapterInterface from "../adapters/AdapterInterface";
import SpeciesAdapterInterface from "../adapters/HasuraAdapter";
import Constraints from '../../../adapters/hasura/HasuraRequestBuilderV2/Constraints';

export default class SpeciesServices implements SpeciesServicesInterface {

    async queryTotalSpecies(jwt: string): Promise<number | null> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryTotalSpecies()
    }

    async queryTotalSpeciesOrigins(jwt: string): Promise<number | null> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryTotalSpeciesOrigins()
    }

    async queryListOfSpecies(jwt: string, speciesConstraints: Constraints): Promise<Array<Species> | UseCaseError> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryListOfSpecies(speciesConstraints)
    }

    async queryGetSpecies(jwt: string, speciesConstraints: Constraints): Promise<Species | UseCaseError> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryGetSpecies(speciesConstraints)
    }

    async queryListOfSpeciesCategories(jwt: string): Promise<Array<string> | UseCaseError> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryListOfSpeciesCategories()
    }

    async queryListOfSpeciesOrigins(jwt: string): Promise<Array<string> | UseCaseError> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryListOfSpeciesOrigins()
    }
}
