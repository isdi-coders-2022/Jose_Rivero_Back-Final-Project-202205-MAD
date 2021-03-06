import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UserController', () => {
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        create: jest.fn(),
                        login: jest.fn(),
                        loginWithToken: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
                AuthService,
                BcryptService,
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('When calling controller.create', () => {
        test('Then service.create should be called', () => {
            controller.create({
                password: 'test',
            });
            expect(service.create).toHaveBeenCalled();
        });
    });

    describe('When calling controller.login without token', () => {
        test('Then service.login should be called', () => {
            controller.login(
                {
                    email: '',
                    password: '',
                },
                undefined
            );
            expect(service.login).toHaveBeenCalled();
        });
    });

    describe('When calling controller.login with token', () => {
        test('Then service.loginWithToken should be called', () => {
            controller.login(
                {
                    email: '',
                    password: '',
                },
                'token'
            );
            expect(service.loginWithToken).toHaveBeenCalled();
        });
    });

    describe('When calling controller.findAll', () => {
        test('Then service.findAll should be called', () => {
            controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
        });
    });
    describe('When calling controller.findOne', () => {
        test('Then service.findOne should be called', () => {
            controller.findOne('Testtest');

            expect(service.findOne).toHaveBeenCalled();
        });
    });
    describe('When calling controller.update', () => {
        test('Then service.update should be called', () => {
            controller.update('Testtest', { password: 'testeste' });

            expect(service.update).toHaveBeenCalled();
        });
    });
    describe('When calling controller.remove', () => {
        test('Then service.remove should be called', () => {
            controller.remove('Testtest');

            expect(service.remove).toHaveBeenCalled();
        });
    });
});
