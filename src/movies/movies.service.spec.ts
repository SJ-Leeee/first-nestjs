import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import exp from 'constants';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should be array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2020,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should return 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID : 999');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2020,
      });
      const allmovie = service.getAll().length;
      service.delete(1);
      const afterMovies = service.getAll().length;

      expect(afterMovies).toEqual(allmovie - 1);
    });
    it('should return a 404', () => {
      try {
        service.delete(888);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should be created', () => {
      const newMoive = service.create({
        title: 'test',
        genres: ['test'],
        year: 2020,
      });

      expect(newMoive).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2020,
      });

      service.update(1, { title: 'Test!!!' });
      const moive = service.getOne(1);
      expect(moive.title).toEqual('Test!!!');
    });
  });
});
