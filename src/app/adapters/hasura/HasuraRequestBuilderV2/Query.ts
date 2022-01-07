import Constraints from './Constraints';

export default class Query{
	queryName: string
	returns: Array<string | Query>
	constraints: Constraints

	constructor(queryName: string) {
		this.queryName = queryName
		this.returns = []
		this.constraints = new Constraints()
	}

	addReturnToQuery(param: string | Query): Query{
		this.returns = [...this.returns, param]
		return this
	}


	buildQuery(): string{
		return this.buildSubQuery(this)
	}

	buildSubQuery(queryObject: Query, isSubQuery: boolean = false): string {
		let query: string =  ''

		if(isSubQuery === true){
			query += queryObject.queryName
		}

		if(isSubQuery === false){
			query += queryObject.queryName
		}

		const constraints: string = queryObject.constraints.buildConstraints()
		if(constraints !== null){
			query += constraints
		}

		query += ' { '

		queryObject.returns.forEach((subQuery: Query | any) => {

			if(typeof subQuery === 'object'){

				query += this.buildSubQuery(subQuery, true)

			}else {
				query += subQuery
				query += ', '
			}

		})

		query += ' }'

		return query
	}
}