export default interface SwapiInterface {
  count: number,
  previous: string | null
  next: string | null
  results: object[]
}