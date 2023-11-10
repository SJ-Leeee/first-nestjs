import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/Movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // @Get('search')
  // search(@Query('year') searchYear: string) {
  //   return `${searchYear} 이후 검색된것만`;
  // }
  // search가 :ee 보다 밑에 있으면 파라미터로 인식된다.

  @Get(':id')
  getOne(@Param('id') id: number): Movie {
    return this.moviesService.getOne(id);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.moviesService.delete(id);
  }

  @Patch(':id')
  patch(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(id, updateData);
  }
  //put은 전체 patch 부분
}
