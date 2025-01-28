import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';

describe('RolesService', () => {
  let service: RolesService;

  const mockRolesService = {
    getRoles: jest.fn((id: string | undefined) => id ? [] : {})
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: RolesService, useValue: mockRolesService }
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array', () => {
    expect(service.getRoles("id")).toBeInstanceOf(Array);
  });

  it('should return an object', () => {
    expect(service.getRoles(undefined)).toBeInstanceOf(Object);
  });
});
