import ConstraintPart from '../../../../../adapters/hasura/HasuraRequestBuilderV2/ConstraintPart';

export default class SpeciesGenreConstraints {


	public static buildConstraintsFilters(filters: object): ConstraintPart{
		if(filters.hasOwnProperty('species_genre') === false){
			return null
		}

		let sanitizedFilters = this.sanitizeFilters(filters.species_genre)
		let filtersAreNull: boolean = true

		Object.keys(sanitizedFilters).forEach((key: string) => {
			if(sanitizedFilters[key] !== null){
				filtersAreNull = false
			}
		})

		if(filtersAreNull === true){
			return null
		}

		let speciesGenreConstraints: ConstraintPart = new ConstraintPart('species_genre')

		speciesGenreConstraints.constraints = [
			...speciesGenreConstraints.constraints,
			this.buildSpeciesGenreConstraints(sanitizedFilters)
		]

		return speciesGenreConstraints
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


	private static buildSpeciesGenreConstraints(filters: object): ConstraintPart{

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