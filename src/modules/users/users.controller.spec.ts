import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Types } from 'mongoose';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUser = {
    _id: new Types.ObjectId(),
    name: "test",
    lastName: "user",
    role: new Types.ObjectId(),
    email: "test@mail.com",
    password: "Password123!"
  }

  const mockUsersService = {
    getUserById: jest.fn((_: string) => mockUser),
    createUser: jest.fn(mockUser => mockUser)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        { provide: UsersService, useValue: mockUsersService }
      ]
    })
    .overrideProvider(UsersController)
    .useValue(mockUsersService)
    .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return mock user', async () => {
    expect(await controller.getUserById(mockUser._id.toString())).toEqual(mockUser);
  });
});
