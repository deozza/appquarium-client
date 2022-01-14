import ConstraintPart from '../../../../../adapters/hasura/HasuraRequestBuilderV2/ConstraintPart';

export default class SpeciesFamilyConstraints {


	public static buildConstraintsFilters(filters: object): ConstraintPart{
		if(filters.hasOwnProperty('species_family') === false){
			return null
		}

		let sanitizedFilters = this.sanitizeFilters(filters.species_family)
		let filtersAreNull: boolean = true

		Object.keys(sanitizedFilters).forEach((key: string) => {
			if(sanitizedFilters[key] !== null){
				filtersAreNull = false
			}
		})

		if(filtersAreNull === true){
			return null
		}

		let speciesFamilyConstraints: ConstraintPart = new ConstraintPart('species_family')

		speciesFamilyConstraints.constraints = [
			...speciesFamilyConstraints.constraints,
			this.buildSpeciesFamilyConstraints(sanitizedFilters)
		]

		return speciesFamilyConstraints
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


	private static buildSpeciesFamilyConstraints(filters: object): ConstraintPart{

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