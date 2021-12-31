import {GraphQLClient} from "graphql-request";

export default class HasuraClient {
    client: GraphQLClient

    constructor(jwt: string) {

        let headers = {
            "content-type": "application/json"
        }

        if (jwt !== '') {
            headers['Authorization'] = `Bearer ${jwt}`
        }

        this.client = new GraphQLClient(import.meta.env.VITE_HASURA_ENDPOINT, {headers: headers})
    }
}
