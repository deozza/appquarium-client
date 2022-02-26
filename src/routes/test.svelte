<script lang="ts">

	import Query from '../app/adapters/hasura/HasuraRequestBuilderV2/Query';
	import ConstraintPart from '../app/adapters/hasura/HasuraRequestBuilderV2/ConstraintPart';
	import Constraints from '../app/adapters/hasura/HasuraRequestBuilderV2/Constraints';

	const queryBuilder: Query = new Query('query')

	const mediasSubQuery: Query = new Query('medias')
		.addReturnToQuery('url')
		.addReturnToQuery('title')

	mediasSubQuery.constraints.where = new ConstraintPart('where')
		.addConstraint([
			new ConstraintPart('thumbnail').addConstraint([new ConstraintPart('_eq').addConstraint('true')])
		])

	const speciesSubQuery: Query = new Query('species')
		.addReturnToQuery('updated_at')
		.addReturnToQuery('category')
		.addReturnToQuery('origin')
		.addReturnToQuery(
			new Query('naming')
				.addReturnToQuery('name')
				.addReturnToQuery(
					new Query('species_genre')
						.addReturnToQuery('name'))
		)
		.addReturnToQuery(
			new Query('water_constraints')
				.addReturnToQuery('ph_min')
				.addReturnToQuery('ph_max')
				.addReturnToQuery('gh_min')
				.addReturnToQuery('gh_max')
				.addReturnToQuery('temp_min')
				.addReturnToQuery('temp_max')
		)
		.addReturnToQuery(mediasSubQuery)


	let constraints = new Constraints()
	constraints.where = new ConstraintPart('where')
		.addConstraint([
			new ConstraintPart('origin').addConstraint([new ConstraintPart('_eq').addConstraint('central_america')]),
			new ConstraintPart('naming').addConstraint([
				new ConstraintPart('species_genre').addConstraint([
					new ConstraintPart('name').addConstraint([new ConstraintPart('_eq').addConstraint('"Poecilia"')])
				])
			]),
		])


	speciesSubQuery.constraints = constraints

	queryBuilder.addReturnToQuery(speciesSubQuery)

	const query: string = queryBuilder.buildQuery()

	console.log(query)

	console.log(constraints.where)

</script>