import ConstraintPart from '../../../adapters/hasura/HasuraRequestBuilderV2/ConstraintPart';
import Constraints from '../../../adapters/hasura/HasuraRequestBuilderV2/Constraints';

export default class ConstraintBuilder{

	originConstraint: ConstraintPart
	namingConstraints: ConstraintPart
	speciesFamilyConstraints: ConstraintPart

	constructor() {
		this.originConstraint = new ConstraintPart('origin')
		this.namingConstraints = new ConstraintPart('naming')
		this.speciesFamilyConstraints = new ConstraintPart('species_family')
	}

	private static initNameConstraint(): ConstraintPart{
		return new ConstraintPart('name')
	}

	public buildConstraintsFilters(filters: object): ConstraintPart{
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

		if(this.buildOriginConstraint(sanitizedFilters) === true){
			whereConstraint.constraints = [
				...whereConstraint.constraints,
				this.originConstraint
			]
		}

		if(this.buildNamingConstraints(sanitizedFilters) === true){
			whereConstraint.constraints = [
				...whereConstraint.constraints,
				this.namingConstraints
			]
		}
		return whereConstraint
	}

	private sanitizeFilters(filters: object): object{
		Object.keys(filters).forEach((key: string) => {
			if(filters[key] === ''){
				filters[key] = null
			}
		})

		return filters
	}

	private buildOriginConstraint(filters: object): boolean{
		if(filters.hasOwnProperty('origin') === false){
			return false
		}

		if(filters.origin === null || filters.origin === ''){
			return false
		}

		this.originConstraint.addConstraint([new ConstraintPart('_eq').addConstraint(filters.origin)])
		return true
	}

	private buildNamingConstraints(filters: object): boolean{

		let constraintIsAdded: boolean = false

		if(this.buildSpeciesFamilyConstraints(filters) === true){
			this.namingConstraints.constraints = [
				...this.namingConstraints.constraints,
				this.speciesFamilyConstraints
			]

			constraintIsAdded = true
		}

		if(filters.hasOwnProperty('name') === false){
			return constraintIsAdded
		}

		if(filters.name === null || filters.name === ''){
			return constraintIsAdded
		}

		const nameConstraint: ConstraintPart = ConstraintBuilder.initNameConstraint()

		this.namingConstraints.addConstraint([nameConstraint.addConstraint([
			new ConstraintPart('_ilike').addConstraint('"%'+filters.name+'%"')
		])])

		constraintIsAdded = true
		return constraintIsAdded
	}

	private buildSpeciesFamilyConstraints(filters: object): boolean{
		if(filters.hasOwnProperty('species_family') === false){
			return false
		}

		if(filters.species_family === null || filters.species_family === ''){
			return false
		}

		const nameConstraint: ConstraintPart = ConstraintBuilder.initNameConstraint()

		this.speciesFamilyConstraints.addConstraint([nameConstraint.addConstraint([
			new ConstraintPart('_ilike').addConstraint('"%'+filters.species_family+'%"')
		])])

		return true
	}
}

