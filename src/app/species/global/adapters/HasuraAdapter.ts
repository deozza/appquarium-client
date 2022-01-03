import type AdapterInterface from "./AdapterInterface";

import UseCaseError from "../../../utils/useCasesResult/types/UseCaseError";
import HasuraQueryBuilder from "../../../adapters/hasura/HasuraRequestBuilder/HasuraQueryBuilder";

import Species from "../entities/Species";
import SpeciesGenre from "../entities/SpeciesGenre";
import SpeciesFamily from "../entities/SpeciesFamily";
import HasuraClient from "../../../adapters/hasura/HasuraClient";

export default class HasuraAdapter extends HasuraClient implements AdapterInterface {

    async queryTotalSpecies(): Promise<number | null> {

        let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species_aggregate')
        queryBuilder.addReturn('aggregate {count}')
        const query: string = queryBuilder.getRequest()

        try {
            const data = await this.client.request(query)
            const totalSpecies: number = data.species_aggregate.aggregate.count
            return totalSpecies
        } catch (e) {
            return null
        }
    }

    async queryListOfSpecies(): Promise<Array<Species> | UseCaseError> {

        let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species')
        queryBuilder.addOrderBy('updated_at')
        queryBuilder.addReturn('category', 'updated_at', 'naming {name,  species_genre {name}}', 'medias(where: {thumbnail: {_eq: true}}) {url, title}')

        const query: string = queryBuilder.getRequest()

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

    async queryGetSpecies(genre: string, name: string): Promise<Species | UseCaseError> {


        const query: string = `query($genre: String!, $name: String!){
          species(where: {naming: {species_genre: {name: {_eq: $genre}}, _and: {name: {_eq: $name}}}}) {
            medias(where: {thumbnail: {_eq: true}}) {
              url
              title
            }
            naming {
              name
              species_genre {
                name
              }
              old_names
              common_names
              species_family {
                name
              }
              updated_at
            }
            origin
            water_constraints {
              gh_max
              gh_min
              ph_max
              ph_min
              temp_max
              temp_min
            }
            animal_specs {
              female_size
              longevity_in_years
              male_size
            }
            category
          }
        }`

        try {
            const data = await this.client.request(query, {
                genre: genre,
                name: name
            })

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


    async queryListOfSpeciesCategories(): Promise<Array<string> | UseCaseError> {
        let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species_categories')
        queryBuilder.addReturn('name')

        const query: string = queryBuilder.getRequest()

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

    async queryListOfSpeciesFamiliesByCategory(category: string): Promise<Array<SpeciesFamily> | UseCaseError> {
        let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species_family')
        queryBuilder.addReturn('uuid', 'name', 'category', 'user_uid')
        queryBuilder.addParam('$category', 'species_categories_enum', category)
        queryBuilder.addWhere('category', '_eq', '$category')
        const query: string = queryBuilder.getRequest()

        try {
            const data = await this.client.request(query, {
                category: category
            })
            const listOfSpeciesFamilies: Array<SpeciesGenre> = data.species_family.map((item: Array<string>) => new SpeciesFamily(item))
            return listOfSpeciesFamilies
        } catch (e) {
            if (e.message.includes("JWTExpired")) {
                return new UseCaseError("JWT expired", 401)
            }
            return new UseCaseError(e.message, 400)
        }
    }

    async queryListOfSpeciesGenresByCategory(category: string): Promise<Array<SpeciesGenre> | UseCaseError> {
        let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species_genre')
        queryBuilder.addReturn('uuid', 'name', 'category', 'user_uid')
        queryBuilder.addParam('$category', 'species_categories_enum', category)
        queryBuilder.addWhere('category', '_eq', '$category')
        const query: string = queryBuilder.getRequest()

        try {
            const data = await this.client.request(query, {
                category: category
            })

            const listOfSpeciesGenres: Array<SpeciesGenre> = data.species_genre.map((item: Array<string>) => new SpeciesGenre(item))
            return listOfSpeciesGenres
        } catch (e) {
            if (e.message.includes("JWTExpired")) {
                return new UseCaseError("JWT expired", 401)

            }
            return new UseCaseError(e.message, 400)
        }
    }

    async queryListOfSpeciesOrigins(): Promise<Array<string> | UseCaseError> {
        let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species_origin')
        queryBuilder.addReturn('name')
        const query: string = queryBuilder.getRequest()

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

    async queryListOfSpeciesByCategory(category: string): Promise<Array<Species> | UseCaseError> {
        let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('species')
        queryBuilder.addReturn('uuid', 'created_at', 'updated_at', 'category', 'publication_state', 'naming {name, species_genre {name}}')
        queryBuilder.addParam('$category', 'species_categories_enum', category)
        queryBuilder.addWhere('category', '_eq', '$category')
        queryBuilder.addOrderBy('created_at')

        const query: string = queryBuilder.getRequest()

        try {
            const data = await this.client.request(query, {
                category: category
            })

            const listOfSpecies: Array<Species> = data.species.map((item: Array<string>) => new Species(item))
            return listOfSpecies
        } catch (e) {
            if (e.message.includes("JWTExpired")) {
                return new UseCaseError("JWT expired", 401)
            }
            return new UseCaseError(e.message, 400)
        }
    }
}
