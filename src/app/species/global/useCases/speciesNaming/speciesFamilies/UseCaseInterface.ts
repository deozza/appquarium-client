import Result from '../../../../../utils/useCasesResult/Result';

export default interface SpeciesFamiliesUseCaseInterface {
	getTotalSpeciesFamilies(jwt: string): Promise<Result>
}
