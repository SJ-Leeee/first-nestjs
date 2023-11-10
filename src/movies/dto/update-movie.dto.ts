import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
// 모든 필드를 선택적으로
