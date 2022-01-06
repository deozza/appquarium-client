export default interface SpeciesFamiliesAdapterInterface{
	queryTotalSpeciesFamilies(): Promise<number | null>
}