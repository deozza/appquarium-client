export default class UnexpectedStyleError extends Error {
    constructor(unexpectedStyle: string, componentName: string) {
        super();
        this.message = "Style '" + unexpectedStyle + "' is not a valid style for " + componentName + "."
    }
}
