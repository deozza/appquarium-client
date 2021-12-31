import UseCaseSuccess from "./types/UseCaseSuccess";
import UseCaseError from "./types/UseCaseError";

export default class Result {
    success: UseCaseSuccess | null = null
    errors: Array<UseCaseError> = []
    content: any = {}

    public addSuccess(type: string, code: number) {
        this.success = new UseCaseSuccess(type, code)
    }

    public addError(type: string, code: number) {
        const error: UseCaseError = new UseCaseError(type, code)
        this.errors.push(error)
    }

    public isSuccessful(): boolean {
        return this.success !== null && this.errors.length === 0;
    }

    public isFailed(): boolean {
        return this.success === null && this.errors.length > 0;
    }
}
