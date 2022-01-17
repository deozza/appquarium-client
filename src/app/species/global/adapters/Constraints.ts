import ConstraintPart from '../../../adapters/hasura/HasuraRequestBuilderV2/ConstraintPart';
import SpeciesNamingConstraints from './speciesNaming/Constraints';

export default class ConstraintBuilder{

	public static buildConstraintsFilters(filters: object): ConstraintPart{
		let sanitizedFilters = this.sanitizeFilters(filters)

		let filtersAreNull: boolean = true

		Object.keys(sanitizedFilters).forEach((key: string) => {
			if(sanitizedFilters[key] !== null){
				filtersAreNull = false
			}
		})

		if(filtersAreNull === true){
			return null
		}

		let whereConstraint: ConstraintPart = new ConstraintPart('where')

		const originConstraints: ConstraintPart = this.buildOriginConstraint(filters)
		if(originConstraints !== null){
			whereConstraint.constraints = [
				...whereConstraint.constraints,
				originConstraints
			]
		}

		const categoryConstraints: ConstraintPart = this.buildCategoryConstraint(filters)
		if(categoryConstraints !== null){
			whereConstraint.constraints = [
				...whereConstraint.constraints,
				categoryConstraints
			]
		}

		const speciesNamingConstraints: ConstraintPart = SpeciesNamingConstraints.buildConstraintsFilters(filters)
		if(speciesNamingConstraints !== null){
			whereConstraint.constraints = [
				...whereConstraint.constraints,
				speciesNamingConstraints
			]
		}

		return whereConstraint
	}

	private static sanitizeFilters(filters: object): object{
		Object.keys(filters).forEach((key: string) => {
			if(filters[key] === ''){
				filters[key] = null
			}
		})

		return filters
	}

	private static buildOriginConstraint(filters: object): ConstraintPart{
		if(filters.hasOwnProperty('origin') === false){
			return null
		}

		if(filters.origin === null){
			return null
		}

		return new ConstraintPart('origin')
			.addConstraint([new ConstraintPart('_eq').addConstraint(filters.origin)])
	}

	private static buildCategoryConstraint(filters: object): ConstraintPart{
		if(filters.hasOwnProperty('category') === false){
			return null
		}

		if(filters.category === null){
			return null
		}

		return new ConstraintPart('category')
			.addConstraint([new ConstraintPart('_eq').addConstraint(filters.category)])
	}

}

