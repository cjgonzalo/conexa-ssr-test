import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Types } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    _id: new Types.ObjectId(),
    name: "test",
    lastName: "user",
    role: new Types.ObjectId(),
    email: "test@mail.com",
    password: "Password123!"
  }

  const mockAccessToken = { accessToken: "access-token" }

  const mockAuthService = {
    signUp: jest.fn(mockUser => mockUser),
    login: jest.fn((_: string, __: string) => mockAccessToken)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService}
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return mockUser', async () => {
    expect(await service.signUp(mockUser)).toEqual(mockUser);
  });

  it('should return accesToken', async () => {
    expect(await service.login(mockUser.email, mockUser.password)).toEqual(mockAccessToken);
  });
});
