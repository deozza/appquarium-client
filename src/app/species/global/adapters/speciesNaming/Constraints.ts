import ConstraintPart from '../../../../adapters/hasura/HasuraRequestBuilderV2/ConstraintPart';
import SpeciesGenreConstraints from './speciesGenres/Constraints';
import SpeciesFamilyConstraints from './speciesFamilies/Constraints';

export default class SpeciesNamingConstraints {


	public static buildConstraintsFilters(filters: object): ConstraintPart{
		if(filters.hasOwnProperty('naming') === false){
			return null
		}

		let sanitizedFilters = this.sanitizeFilters(filters.naming)

		if(this.checkFiltersAreEmpty(sanitizedFilters) === true){
			return null
		}

		let constraints: Array<ConstraintPart> = []

		const buildedNamingConstraints: ConstraintPart = this.buildNamingConstraints(sanitizedFilters)
		if(buildedNamingConstraints !== null){
			constraints = [
				...constraints,
				buildedNamingConstraints,
			]
		}

		const buildedSpeciesFamilyConstraints: ConstraintPart = SpeciesFamilyConstraints.buildConstraintsFilters(sanitizedFilters)
		if(buildedSpeciesFamilyConstraints !== null){
			constraints = [
				...constraints,
				buildedSpeciesFamilyConstraints,
			]
		}

		const buildedSpeciesGenreConstraints: ConstraintPart = SpeciesGenreConstraints.buildConstraintsFilters(sanitizedFilters)
		if(buildedSpeciesGenreConstraints !== null){
			constraints = [
				...constraints,
				buildedSpeciesGenreConstraints,
			]
		}

		if(constraints.length === 0){
			return null
		}

		let namingConstraints: ConstraintPart = new ConstraintPart('naming')
		namingConstraints.constraints = constraints

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

	private static checkFiltersAreEmpty(object) {
		return Object.values(object).every(v => v && typeof v === 'object'
			? this.checkFiltersAreEmpty(v)
			: v === 0 || v === null
		);
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