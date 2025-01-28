import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserInterface } from './interfaces/user.interface';
import { Types } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;

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
      providers: [
        { provide: UsersService, useValue: mockUsersService }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return mockUser', async () => {
    expect(await service.getUserById(mockUser._id.toString())).toEqual(mockUser);
  });

  it('should return mockUser', async () => {
    expect(await service.createUser(mockUser)).toEqual(mockUser);
  });
});
