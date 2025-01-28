import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  const mockMoviesService = {
    getMovies: jest.fn(() => []),
    getMovieById: jest.fn((id: string) => ({ id })),
    createMovie: jest.fn((movie) => movie)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: MoviesService, useValue: mockMoviesService },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return all movies", () => {
    expect(service.getMovies()).toBeInstanceOf(Array)
  })

  it("should return a movie with given id", () => {
    expect(service.getMovieById("1")).toEqual({ id: "1" })
  })

  it("should return the created movie", () => {
    const movieToCreate = { name: "Test movie", characters: [1, 2, 3] }
    expect(service.createMovie(movieToCreate)).toEqual(movieToCreate)
  })
});
