export default class UnexpectedSizeError extends Error {
    constructor(unexpectedSize: string | number, componentName: string) {
        super();
        this.message = "Size '" + unexpectedSize + "' is not a valid size for " + componentName + "."
    }
}
