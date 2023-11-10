import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'this will return all';
  }

  @Get('/:ee')
  getOne(@Param('ee') id: number) {
    return `this is ${id} movie`;
  }

  @Post()
  createMovie() {
    return `this will create a movie`;
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return `this will delete ${id} movie`;
  }

  @Patch('/:id')
  paytch(@Param('id') id: string) {
    return `${id}를 수정한다`;
  }

  //put은 전체 patch 부분
}
