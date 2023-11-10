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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'this will return all';
  }

  @Get('search')
  search(@Query('year') searchYear: string) {
    return `${searchYear} 이후 검색된것만`;
  }
  // search가 :ee 보다 밑에 있으면 파라미터로 인식된다.

  @Get(':ee')
  getOne(@Param('ee') id: number) {
    return `this is ${id} movie`;
  }

  @Post()
  createMovie(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `this will delete ${id} movie`;
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() movieData) {
    return {
      updateMovieId: id,
      ...movieData,
    };
  }
  //put은 전체 patch 부분
}
