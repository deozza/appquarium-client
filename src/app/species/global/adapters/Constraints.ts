import ConstraintPart from '../../../adapters/hasura/HasuraRequestBuilderV2/ConstraintPart';
import SpeciesNamingConstraints from './speciesNaming/Constraints';

export default class ConstraintBuilder{

	public static buildConstraintsFilters(filters: object): ConstraintPart{
		let sanitizedFilters = this.sanitizeFilters(filters)

		if(this.checkFiltersAreEmpty(sanitizedFilters) === true){
			return null
		}

		let constraints: Array<ConstraintPart> = []

		const originConstraints: ConstraintPart = this.buildOriginConstraint(filters)
		if(originConstraints !== null){
			constraints = [
				...constraints,
				originConstraints
			]
		}

		const categoryConstraints: ConstraintPart = this.buildCategoryConstraint(filters)
		if(categoryConstraints !== null){
			constraints = [
				...constraints,
				categoryConstraints
			]
		}

		const speciesNamingConstraints: ConstraintPart = SpeciesNamingConstraints.buildConstraintsFilters(filters)
		if(speciesNamingConstraints !== null){
			constraints = [
				...constraints,
				speciesNamingConstraints
			]
		}

		if(constraints.length === 0){
			return null
		}

		let whereConstraint: ConstraintPart = new ConstraintPart('where')
		whereConstraint.constraints = constraints

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

	private static checkFiltersAreEmpty(object) {
		return Object.values(object).every(v => v && typeof v === 'object'
			? this.checkFiltersAreEmpty(v)
			: v === 0 || v === null
		);
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

