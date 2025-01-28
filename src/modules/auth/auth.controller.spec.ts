import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ResponseService } from '../shared/responses.service';
import { Types } from 'mongoose';

describe('AuthController', () => {
  let controller: AuthController;

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
    signUp: jest.fn(_ => new ResponseService().create()),
    login: jest.fn((_: string, __: string) => mockAccessToken)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        ResponseService
      ]
    })
    .overrideProvider(AuthController)
    .useValue(mockAuthService)
    .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return ResponseService.create()', async () => {
    expect(await controller.signUp(mockUser)).toEqual(new ResponseService().create());
  });

  it('should return ResponseService.success()', async () => {
    expect(await controller.login(mockUser.email, mockUser.password)).toEqual(new ResponseService().success(mockAccessToken));
  });
});
