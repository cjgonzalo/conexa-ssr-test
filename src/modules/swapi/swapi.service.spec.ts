import { Test, TestingModule } from '@nestjs/testing';
import { SwapiService } from './swapi.service';

describe('SwapiService', () => {
  let service: SwapiService;

  const mockSwapiService = {
    getResources: jest.fn(() => ({
      films: "",
      planets: "",
      species: "",
      vehicles: "",
      starships: ""
    })),

    getSwapiData: jest.fn(((_: string) => ({
      count: 1,
      previous: "",
      next: "",
      results: []
    })))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: SwapiService, useValue: mockSwapiService }
      ],
    }).compile();

    service = module.get<SwapiService>(SwapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an object that implements SwapiResourcesInterface', async () => {
    const resources = await service.getResources()
    expect(resources).toBeInstanceOf(Object);
    expect(resources).toHaveProperty("films");
    expect(resources).toHaveProperty("planets");
    expect(resources).toHaveProperty("species");
    expect(resources).toHaveProperty("starships");
    expect(resources).toHaveProperty("vehicles");
  });

  it('should return an object that implements SwapiInterface', async () => {
    const resource = "mock resource"
    const swapiData = await service.getSwapiData(resource)
    expect(swapiData).toBeInstanceOf(Object);
    expect(swapiData).toHaveProperty("count");
    expect(swapiData).toHaveProperty("previous");
    expect(swapiData).toHaveProperty("next");
    expect(swapiData).toHaveProperty("results");
  });
});
