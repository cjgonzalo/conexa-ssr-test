import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleInterface } from './interfaces/roles.interface';

describe('RolesController', () => {
  let controller: RolesController;

  const mockRolesController = {
    getRoles: jest.fn(),
    createRole: jest.fn((role: RoleInterface) => role)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [{ provide: RolesService, useValue: mockRolesController }]
    })
    .overrideProvider(RolesController)
    .useValue(mockRolesController)
    .compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the created role', async () => {
    const roleToCreate = { name: "test role" }
    expect(await controller.createRole(roleToCreate)).toEqual(roleToCreate);
  });
});
