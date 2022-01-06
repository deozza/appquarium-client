export default interface SpeciesFamiliesServiceInterface {
	queryTotalSpeciesFamilies(jwt: string): Promise<number | null>
}