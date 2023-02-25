export class GetAllLanguagesQueryDto {
  readonly search?: string;
  readonly offset: number;
  readonly limit: number;
  readonly sortDirection: string;
  readonly sortBy: string;
}
