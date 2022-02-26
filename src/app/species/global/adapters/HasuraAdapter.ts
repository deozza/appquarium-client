import type SpeciesAdapterInterface from "./AdapterInterface";

import UseCaseError from "../../../utils/useCasesResult/types/UseCaseError";

import Species from "../entities/Species";
import HasuraClient from "../../../adapters/hasura/HasuraClient";
import Query from '../../../adapters/hasura/HasuraRequestBuilderV2/Query';
import ConstraintPart from '../../../adapters/hasura/HasuraRequestBuilderV2/ConstraintPart';
import Constraints from '../../../adapters/hasura/HasuraRequestBuilderV2/Constraints';

export default class SpeciesHasuraAdapter extends HasuraClient implements SpeciesAdapterInterface {

    async queryTotalSpecies(): Promise<number | null> {

        const queryBuilder: Query = new Query('query')
          .addReturnToQuery(new Query('species_aggregate')
            .addReturnToQuery(new Query('aggregate')
              .addReturnToQuery('count')
            )
          )

        const query: string = queryBuilder.buildQuery()

        try {
            const data = await this.client.request(query)
            const totalSpecies: number = data.species_aggregate.aggregate.count
            return totalSpecies
        } catch (e) {
            return null
        }
    }

    async queryTotalSpeciesOrigins(): Promise<number | null> {

        const queryBuilder: Query = new Query('query')
          .addReturnToQuery(new Query('species_origin_aggregate')
            .addReturnToQuery(new Query('aggregate')
              .addReturnToQuery('count')
            )
          )

        const query: string = queryBuilder.buildQuery()

        try {
            const data = await this.client.request(query)
            const totalSpeciesOrigins: number = data.species_origin_aggregate.aggregate.count
            return totalSpeciesOrigins
        } catch (e) {
            return null
        }
    }

    async queryGetSpecies(speciesConstraints: Constraints): Promise<Species | UseCaseError> {
        const queryBuilder: Query = new Query('query')

        const speciesSubQuery: Query = new Query('species')
          .addReturnToQuery('origin')
          .addReturnToQuery('category')
          .addReturnToQuery(new Query('naming')
            .addReturnToQuery('name')
            .addReturnToQuery('old_names')
            .addReturnToQuery('common_names')
            .addReturnToQuery(new Query('species_genre')
              .addReturnToQuery('name')
            )
            .addReturnToQuery(new Query('species_family')
              .addReturnToQuery('name')
            )
          )
          .addReturnToQuery(new Query('water_constraints')
            .addReturnToQuery('ph_min')
            .addReturnToQuery('ph_max')
            .addReturnToQuery('gh_min')
            .addReturnToQuery('gh_max')
            .addReturnToQuery('temp_min')
            .addReturnToQuery('temp_max')
          )
          .addReturnToQuery(new Query('animal_specs')
            .addReturnToQuery('female_size')
            .addReturnToQuery('male_size')
            .addReturnToQuery('longevity_in_years')
          )
          .addReturnToQuery(new Query('plant_specs')
            .addReturnToQuery('size')
            .addReturnToQuery('zone')
            .addReturnToQuery('growth_speed')
            .addReturnToQuery('need_in_fertilizer')
            .addReturnToQuery('need_in_carbone')
          )
          .addReturnToQuery(new Query('species_aquarium_constraints')
            .addReturnToQuery('uuid')
            .addReturnToQuery('updated_at')
            .addReturnToQuery('species_uuid')
            .addReturnToQuery('min_volume')
            .addReturnToQuery('max_volume')
            .addReturnToQuery('min_length')
            .addReturnToQuery('max_height')
            .addReturnToQuery('decor')
            .addReturnToQuery('soil_kind')
          )
          .addReturnToQuery(new Query('animal_behaviour')
            .addReturnToQuery('uuid')
            .addReturnToQuery('updated_at')
            .addReturnToQuery('species_uuid')
            .addReturnToQuery('aquarium_kind')
            .addReturnToQuery('intraspecific_behaviour')
            .addReturnToQuery('extraspecific_behaviour')
            .addReturnToQuery('female_per_male')
            .addReturnToQuery('min_group')
            .addReturnToQuery('max_group')
            .addReturnToQuery('zone')
            .addReturnToQuery('alimentation')
            .addReturnToQuery('diurnal')
          )
          .addReturnToQuery(new Query('medias')
            .addReturnToQuery('url')
            .addReturnToQuery('title')
            .addReturnToQuery('source')
          )

        speciesSubQuery.constraints = speciesConstraints

        queryBuilder.addReturnToQuery(speciesSubQuery)

        const query: string = queryBuilder.buildQuery()

        try {
            const data = await this.client.request(query)

            if(data.species.length === 1){
                return new Species(data.species[0])
            }

            throw new Error('not found')
        } catch (e) {
            if (e.message.includes("JWTExpired")) {
                return new UseCaseError("JWT expired", 401)

            }
            console.log(e)
            return new UseCaseError(e.message, 400)
        }
    }

    async queryGetSpeciesByUuid(uuid:string): Promise<Species | UseCaseError> {
        const queryBuilder: Query = new Query('query')

        const speciesSubQuery: Query = new Query('species_by_pk')
          .addReturnToQuery('uuid')
          .addReturnToQuery('origin')
          .addReturnToQuery('category')
          .addReturnToQuery(new Query('naming')
            .addReturnToQuery('name')
            .addReturnToQuery('old_names')
            .addReturnToQuery('common_names')
            .addReturnToQuery(new Query('species_genre')
              .addReturnToQuery('name')
            )
            .addReturnToQuery(new Query('species_family')
              .addReturnToQuery('name')
            )
          )
          .addReturnToQuery(new Query('water_constraints')
            .addReturnToQuery('ph_min')
            .addReturnToQuery('ph_max')
            .addReturnToQuery('gh_min')
            .addReturnToQuery('gh_max')
            .addReturnToQuery('temp_min')
            .addReturnToQuery('temp_max')
          )
          .addReturnToQuery(new Query('animal_specs')
            .addReturnToQuery('female_size')
            .addReturnToQuery('male_size')
            .addReturnToQuery('longevity_in_years')
          )
          .addReturnToQuery(new Query('medias')
            .addReturnToQuery('url')
            .addReturnToQuery('title')
            .addReturnToQuery('source')
          )

        speciesSubQuery.constraints = new Constraints()

        speciesSubQuery.constraints.where = new ConstraintPart('uuid').addConstraint('"' + uuid + '"')

        queryBuilder.addReturnToQuery(speciesSubQuery)

        const query: string = queryBuilder.buildQuery()

        try {
            const data = await this.client.request(query)

            return new Species(data.species_by_pk)
        } catch (e) {
            if (e.message.includes("JWTExpired")) {
                return new UseCaseError("JWT expired", 401)

            }
            console.log(e)
            return new UseCaseError(e.message, 400)
        }
    }

    async queryListOfSpecies(speciesConstraints: Constraints): Promise<Array<Species> | UseCaseError> {

        const queryBuilder: Query = new Query('query')

        const mediasSubQuery: Query = new Query('medias')
          .addReturnToQuery('url')
          .addReturnToQuery('title')

        mediasSubQuery.constraints.where = new ConstraintPart('where')
          .addConstraint([
              new ConstraintPart('thumbnail').addConstraint([new ConstraintPart('_eq').addConstraint('true')])
          ])

        const speciesSubQuery: Query = new Query('species')
          .addReturnToQuery('uuid')
          .addReturnToQuery('updated_at')
          .addReturnToQuery('category')
          .addReturnToQuery('origin')
          .addReturnToQuery(
            new Query('naming')
              .addReturnToQuery('name')
              .addReturnToQuery(
                new Query('species_genre')
                  .addReturnToQuery('name'))
          )
          .addReturnToQuery(
            new Query('water_constraints')
              .addReturnToQuery('ph_min')
              .addReturnToQuery('ph_max')
              .addReturnToQuery('gh_min')
              .addReturnToQuery('gh_max')
              .addReturnToQuery('temp_min')
              .addReturnToQuery('temp_max')
          )
          .addReturnToQuery(mediasSubQuery)

        speciesSubQuery.constraints = speciesConstraints

        queryBuilder.addReturnToQuery(speciesSubQuery)

        const query: string = queryBuilder.buildQuery()

        try {
            const data = await this.client.request(query)
            const listOfSpecies: Array<Species> = data.species.map((item: Array<string>) => new Species(item))
            return listOfSpecies
        } catch (e) {
            if (e.message.includes("JWTExpired")) {
                return new UseCaseError("JWT expired", 401)

            }
            return new UseCaseError(e.message, 400)
        }
    }

    async queryListOfSpeciesCategories(): Promise<Array<string> | UseCaseError> {

        const queryBuilder: Query = new Query('query')
          .addReturnToQuery(new Query('species_category')
            .addReturnToQuery('name'))

        const query: string = queryBuilder.buildQuery()

        try {
            const data = await this.client.request(query)
            const listOfSpeciesCategories: Array<string> = data.species_categories
            return listOfSpeciesCategories
        } catch (e) {
            if (e.message.includes("JWTExpired")) {
                return new UseCaseError("JWT expired", 401)

            }
            return new UseCaseError(e.message, 400)
        }
    }

    async queryListOfSpeciesOrigins(): Promise<Array<string> | UseCaseError> {

        const queryBuilder: Query = new Query('query')

        const speciesOriginSubQuery: Query = new Query('species_origin')
            .addReturnToQuery('name')

        let speciesOriginConstraints: Constraints = new Constraints();
        speciesOriginConstraints.orderBy = new ConstraintPart('order_by')
          .addConstraint([
              new ConstraintPart('name').addConstraint('asc'),
          ]);

        speciesOriginSubQuery.constraints = speciesOriginConstraints

        queryBuilder.addReturnToQuery(speciesOriginSubQuery)

        const query: string = queryBuilder.buildQuery()

        try {
            const data = await this.client.request(query)
            const listOfSpeciesOrigins: Array<string> = data.species_origin
            return listOfSpeciesOrigins
        } catch (e) {
            if (e.message.includes("JWTExpired")) {
                return new UseCaseError("JWT expired", 401)

            }
            return new UseCaseError(e.message, 400)
        }
    }

}
