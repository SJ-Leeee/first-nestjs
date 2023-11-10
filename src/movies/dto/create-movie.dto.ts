import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional() // 필수는 아닙니다
  @IsString({ each: true })
  readonly genres: string[];
}
