export default class UnexpectedButtonTypeError extends Error {
    constructor(unexpectedType: string, componentName: string) {
        super();
        this.message = "Type '" + unexpectedType + "' is not a valid button type for " + componentName + "."
    }
}
