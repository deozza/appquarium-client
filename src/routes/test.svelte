<script lang="ts">
	import Query from '../app/adapters/hasura/HasuraRequestBuilderV2/Query';


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

	speciesQuery.constraints.where =
		{
			constraintName: 'where',
			constraints: [
				{
					constraintName: 'origin',
					constraints: [
						{
							constraintName: '_eq',
							constraints: 'central_america'
						}
					]
				},
				{
					constraintName: 'naming',
					constraints: [
						{
							constraintName: 'species_genre',
							constraints: [
								{
									constraintName: 'name',
									constraints: [
										{
											constraintName: '_ilike',
											constraints: '"%poecilia%"'
										}
									]
								}
							]
						},
						{
							constraintName: 'name',
							constraints: [
								{
									constraintName: '_ilike',
									constraints: '"%reticulata%"'
								}
							]
						}
					]
				},
			]
		}

		speciesQuery.constraints.limit = 1
		speciesQuery.constraints.offset = 0
	speciesQuery.constraints.orderBy = {
		constraintName: 'order_by',
		constraints:[
			{
				constraintName: 'updated_at',
				constraints: 'asc'
			}
		]
	}

	queryBuilder.addReturnToQuery(speciesQuery)

	console.log(queryBuilder.buildQuery())
	console.log(queryBuilder)

	/*
	speciesSubQueryObject.wheres =
		{
			queryName: 'where',
			where: [
				{
					queryName: 'origin',
					where: [
						{
							queryName: '_eq',
							where: 'central_america'
						}
					]
				},
				{
					queryName: 'naming',
					where: [
						{
							queryName: 'species_family',
							where: [
								{
									queryName: 'name',
									where: [
										{
											queryName: '_ilike',
											where: '"%poecilia%"'
										}
									]
								}
							]
						},
						{
							queryName: 'name',
							where: [
								{
									queryName: '_ilike',
									where: '"%reticulata%"'
								}
							]
						}
					]
				},
			]
		}

	 */
</script>