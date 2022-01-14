import ConstraintPart from '../../../../adapters/hasura/HasuraRequestBuilderV2/ConstraintPart';
import SpeciesGenreConstraints from './speciesGenres/Constraints';
import SpeciesFamilyConstraints from './speciesFamilies/Constraints';

export default class SpeciesNamingConstraints {


	public static buildConstraintsFilters(filters: object): ConstraintPart{
		if(filters.hasOwnProperty('naming') === false){
			return null
		}

		let sanitizedFilters = this.sanitizeFilters(filters.naming)
		let filtersAreNull: boolean = true

		Object.keys(sanitizedFilters).forEach((key: string) => {
			if(sanitizedFilters[key] !== null){
				filtersAreNull = false
			}
		})

		if(filtersAreNull === true){
			return null
		}

		let namingConstraints: ConstraintPart = new ConstraintPart('naming')

		const buildedNamingConstraints: ConstraintPart = this.buildNamingConstraints(sanitizedFilters)
		if(buildedNamingConstraints !== null){
			namingConstraints.constraints = [
				...namingConstraints.constraints,
				buildedNamingConstraints,
			]
		}

		const buildedSpeciesFamilyConstraints: ConstraintPart = SpeciesFamilyConstraints.buildConstraintsFilters(sanitizedFilters)
		if(buildedSpeciesFamilyConstraints !== null){
			namingConstraints.constraints = [
				...namingConstraints.constraints,
				buildedSpeciesFamilyConstraints,
			]
		}

		const buildedSpeciesGenreConstraints: ConstraintPart = SpeciesGenreConstraints.buildConstraintsFilters(sanitizedFilters)
		if(buildedSpeciesGenreConstraints !== null){
			namingConstraints.constraints = [
				...namingConstraints.constraints,
				buildedSpeciesGenreConstraints,
			]
		}

		return namingConstraints
	}

	private static sanitizeFilters(filters: object): object{
		Object.keys(filters).forEach((key: string) => {
			if(filters[key] === ''){
				filters[key] = null
			}
		})

		return filters
	}

	private static initNameConstraint(): ConstraintPart{
		return new ConstraintPart('name')
	}


	private static buildNamingConstraints(filters: object): ConstraintPart{

		if(filters.hasOwnProperty('name') === false){
			return null
		}

		if(filters.name === null){
			return null
		}

		const nameConstraint: ConstraintPart = this.initNameConstraint()

		return nameConstraint.addConstraint([
			new ConstraintPart('_ilike').addConstraint('"%'+filters.name+'%"')
		])
	}

}