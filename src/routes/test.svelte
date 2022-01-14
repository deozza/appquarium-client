<script lang="ts">
	import Query from '../app/adapters/hasura/HasuraRequestBuilderV2/Query';
	import ConstraintPart from '../app/adapters/hasura/HasuraRequestBuilderV2/ConstraintPart';

	let queryBuilder: Query = new Query('query')
	let speciesQuery =
		new Query('species')
		.addReturnToQuery('origin')
		.addReturnToQuery('category')
		.addReturnToQuery(
			new Query('naming')
				.addReturnToQuery('name')
				.addReturnToQuery(
					new Query('species_genre')
						.addReturnToQuery('name')
				)
		)

	speciesQuery.constraints.where = new ConstraintPart('where')
		.addConstraint([
		new ConstraintPart('origin').addConstraint([new ConstraintPart('_eq').addConstraint('central_america')]),
		new ConstraintPart('naming').addConstraint([
				new ConstraintPart('name').addConstraint([new ConstraintPart('_ilike').addConstraint('"%icu%"')]),
				new ConstraintPart('species_genre').addConstraint([
							new ConstraintPart('name').addConstraint([new ConstraintPart('_eq').addConstraint('"Poecilia"')])
						])
				])
		])

	speciesQuery.constraints.limit = 1

	queryBuilder.addReturnToQuery(speciesQuery)

	console.log(queryBuilder.buildQuery())

</script>