import ConstraintPart from './ConstraintPart';

export default class Constraints{
	where: ConstraintPart
	orderBy: ConstraintPart
	offset: number
	limit: number

	constructor() {
		this.where = null
		this.orderBy = null
		this.offset = null
		this.limit = null
	}

	buildConstraints(){

		const whereConstraints = this.buildWhereConstraints()
		const orderByConstraints = this.buildOrderByConstraints()
		const offsetConstraints = this.buildOffsetConstraint()
		const limitConstraints = this.buildLimitConstraint()

		let constraintAsGQLString: string = null

		if(whereConstraints !== null){
			if(constraintAsGQLString === null){
				constraintAsGQLString = '('
			}else{
				constraintAsGQLString += ', '
			}

			constraintAsGQLString += whereConstraints
		}

		if(orderByConstraints !== null){
			if(constraintAsGQLString === null){
				constraintAsGQLString = '('
			}else{
				constraintAsGQLString += ', '
			}

			constraintAsGQLString += orderByConstraints
		}

		if(offsetConstraints !== null){
			if(constraintAsGQLString === null){
				constraintAsGQLString = '('
			}else{
				constraintAsGQLString += ', '
			}

			constraintAsGQLString += offsetConstraints
		}

		if(limitConstraints !== null){
			if(constraintAsGQLString === null){
				constraintAsGQLString = '('
			}else{
				constraintAsGQLString += ', '
			}

			constraintAsGQLString += limitConstraints
		}

		if(constraintAsGQLString !== null){
			constraintAsGQLString += ')'
		}

		return constraintAsGQLString
	}

	private buildWhereConstraints(): string | null{
		if(this.where === null){
			return null
		}

		const constraintPart = new ConstraintPart('')
		const constraintAsString: string = constraintPart.buildConstraintsAsGQLString(this.where)

		return constraintAsString
	}

	private buildOrderByConstraints(): string {
		if(this.orderBy === null){
			return null
		}

		const constraintPart = new ConstraintPart('')
		const constraintAsString: string = constraintPart.buildConstraintsAsGQLString(this.orderBy)


		return constraintAsString
	}

	private buildOffsetConstraint(): string {
		if(this.offset === null){
			return null
		}

		return 'offset: ' + this.offset
	}
	private buildLimitConstraint(): string {
		if(this.limit === null){
			return null
		}

		return 'limit: ' + this.limit
	}

}