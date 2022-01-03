export default class UnexpectedSpeciesPublicationStateError extends Error {
    constructor(unexpectedPublicationState: string) {
        super('Unexpected publication_state : ' + unexpectedPublicationState);
    }
}
