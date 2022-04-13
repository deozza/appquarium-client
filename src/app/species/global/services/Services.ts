import type SpeciesServicesInterface from "./ServicesInterface";

import UseCaseError from "../../../utils/useCasesResult/types/UseCaseError";
import Species from "../entities/Species";

import type AdapterInterface from "../adapters/AdapterInterface";
import SpeciesAdapterInterface from "../adapters/HasuraAdapter";
import Constraints from '../../../adapters/hasura/HasuraRequestBuilderV2/Constraints';
import WaterConstraints from '../entities/WaterConstraints';
import AquariumConstraints from '../entities/AquariumConstraints';
import AnimalBehaviour from '../entities/AnimalBehaviour';

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

    async queryGetSpeciesByUuid(jwt: string, uuid: string): Promise<Species | UseCaseError> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryGetSpeciesByUuid(uuid)
    }

    async queryListOfSpeciesCategories(jwt: string): Promise<Array<string> | UseCaseError> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryListOfSpeciesCategories()
    }

    async queryListOfSpeciesOrigins(jwt: string): Promise<Array<string> | UseCaseError> {
        const adapter: AdapterInterface = new SpeciesAdapterInterface(jwt)

        return await adapter.queryListOfSpeciesOrigins()
    }

    checkSpeciesCompatibility(speciesLeft: Species, speciesRight: Species): object | null {
        let hasErrors: boolean = false
        let errors: object = {
            water_constraints_errors: null,
            aquarium_constraints_errors: null,
            animal_behaviour_errors: null,
        }
        errors.water_constraints_errors = SpeciesServices.checkWaterConstraintsCompatibility(speciesLeft.water_constraints, speciesRight.water_constraints)
        errors.aquarium_constraints_errors = SpeciesServices.checkAquariumConstraintsCompatibility(speciesLeft.aquarium_constraints, speciesRight.aquarium_constraints)
        errors.animal_behaviour_errors = SpeciesServices.checkAnimalBehaviourCompatibility(speciesLeft.animal_behaviour, speciesRight.animal_behaviour)

        Object.keys(errors).forEach(key => {
            if(errors[key] !== null){
                hasErrors = true
            }
        })

        if(hasErrors === true){
            return errors
        }

        return null
    }

    private static checkWaterConstraintsCompatibility(speciesLeftWaterConstraints: WaterConstraints, speciesRightWaterConstraints: WaterConstraints): null | Array<UseCaseError> {
        let errors: Array<UseCaseError> = []

        if(speciesLeftWaterConstraints.ph_min > speciesRightWaterConstraints.ph_max ||
            speciesLeftWaterConstraints.ph_max < speciesRightWaterConstraints.ph_min){
            const error: UseCaseError = new UseCaseError('ph', 400)
            errors = [
              ...errors,
              error
            ]
        }

        if(speciesLeftWaterConstraints.gh_min > speciesRightWaterConstraints.gh_max ||
          speciesLeftWaterConstraints.gh_max < speciesRightWaterConstraints.gh_min){
            const error: UseCaseError = new UseCaseError('gh', 400)
            errors = [
                ...errors,
                error
            ]
        }

        if(speciesLeftWaterConstraints.temp_min > speciesRightWaterConstraints.temp_max ||
          speciesLeftWaterConstraints.temp_max < speciesRightWaterConstraints.temp_min){
            const error: UseCaseError = new UseCaseError('temp', 400)
            errors = [
                ...errors,
                error
            ]
        }

        if(errors.length > 0){
            return errors
        }

        return null
    }

    private static checkAquariumConstraintsCompatibility(speciesLeftAquariumConstraints: AquariumConstraints, speciesRightAquariumConstraints: AquariumConstraints): null | Array<UseCaseError> {
        let errors: Array<UseCaseError> = []

        if(speciesLeftAquariumConstraints.max_volume !== null && speciesLeftAquariumConstraints.max_volume < speciesRightAquariumConstraints.min_volume){
            const error: UseCaseError = new UseCaseError('volume', 400)
            errors = [
              ...errors,
              error
            ]
        }

        if(speciesRightAquariumConstraints.max_volume !== null && speciesRightAquariumConstraints.max_volume < speciesLeftAquariumConstraints.min_volume){
            const error: UseCaseError = new UseCaseError('volume', 400)
            errors = [
                ...errors,
                error
            ]
        }

        if(errors.length > 0){
            return errors
        }

        return null
    }

    private static checkAnimalBehaviourCompatibility(speciesLeftAnimalBehaviour: AnimalBehaviour, speciesRightAnimalBehaviour: AnimalBehaviour): null | Array<UseCaseError> {
        let errors: Array<UseCaseError> = []

        if(speciesLeftAnimalBehaviour.aquarium_kind !== 'communal' || speciesRightAnimalBehaviour.aquarium_kind !== 'communal'){
            const error: UseCaseError = new UseCaseError('aquarium_kind', 400)
            errors = [
                ...errors,
                error
            ]
        }

        if(speciesLeftAnimalBehaviour.extraspecific_behaviour === 'predatorous' || speciesRightAnimalBehaviour.extraspecific_behaviour === 'predatorous'){
            const error: UseCaseError = new UseCaseError('behaviour', 400)
            errors = [
                ...errors,
                error
            ]
        }

        switch (speciesLeftAnimalBehaviour.extraspecific_behaviour){
            case 'timid': {
                if(speciesRightAnimalBehaviour.extraspecific_behaviour === 'active' || speciesRightAnimalBehaviour.extraspecific_behaviour === 'aggressive'){
                    const error: UseCaseError = new UseCaseError('behaviour', 409)
                    errors = [
                        ...errors,
                        error
                    ]
                }
            }break;
            case 'calm': {
                if(speciesRightAnimalBehaviour.extraspecific_behaviour === 'aggressive'){
                    const error: UseCaseError = new UseCaseError('behaviour', 409)
                    errors = [
                        ...errors,
                        error
                    ]
                }
            }break;
            case 'active': {
                if(speciesRightAnimalBehaviour.extraspecific_behaviour === 'timid' || speciesRightAnimalBehaviour.extraspecific_behaviour === 'aggressive'){
                    const error: UseCaseError = new UseCaseError('behaviour', 409)
                    errors = [
                        ...errors,
                        error
                    ]
                }
            }break;
            case 'aggressive': {
                const error: UseCaseError = new UseCaseError('behaviour', 409)
                errors = [
                    ...errors,
                    error
                ]
            }break;
        }

        if(errors.length > 0){
            return errors
        }

        return null
    }
}
