import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum Order {
  DESC = 'desc',
  ASC = 'asc',
}

export class GetRepositoryQuery {
  @IsString()
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  createdAfter?: string;

  @IsString()
  @IsOptional()
  sort?: string = 'stars';

  @IsOptional()
  @IsEnum(Order)
  order?: Order = Order.ASC;

  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  perPage?: number = 30;
}
