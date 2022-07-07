import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { productSchema } from '../products/entities/product.entity';
import { shopSchema } from '../shop-cart/entities/shop-cart.entity';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';
import { userSchema } from './entities/user.entity';
import { UsersService } from './users.service';
import { find } from 'rxjs';

describe('UsersService', () => {
    const mockReturnValue = 'rodrigo';
    const mockUser = {
        name: 'test',
        email: 'test@test.test',
        password: 'password',
        address: 'test',
        payMethod: 'paypal',
        shopCart: '',
        wishList: [''],
        save: jest.fn(),
    };
    const mockShop = { id: '', delete: jest.fn().mockResolvedValue({}) };

    const mockUserModel = {
        create: jest.fn().mockResolvedValue(mockUser),
        find: jest.fn().mockResolvedValue(mockUser),
        findOne: jest.fn().mockResolvedValue(mockUser),
        findById: jest.fn().mockResolvedValue(mockUser),
        findByIdAndUpdate: jest
            .fn()
            .mockResolvedValue({ ...mockUser, name: 'updated' }),
        findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
    };
    const mockShopModel = {
        create: jest.fn().mockResolvedValue(mockShop),
        findOne: jest.fn().mockResolvedValue(mockShop),
    };

    const mockBcrypt = {
        encrypt: jest.fn().mockReturnValue('hashpw'),
        compare: jest.fn().mockReturnValue(true),
    };

    const mockAuth = {
        validateToken: jest.fn().mockReturnValue({ id: 'id' }),
        createToken: jest.fn().mockReturnValue('1f1f1f'),
    };

    const mockResponse = {
        user: mockUser,
        token: '1f1f1f',
    };

    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'User', schema: userSchema },

                    { name: 'Shop', schema: shopSchema },
                ]),
            ],
            providers: [
                UsersService,

                {
                    provide: AuthService,
                    useValue: mockAuth,
                },
                {
                    provide: BcryptService,
                    useValue: mockBcrypt,
                },
            ],
        })
            .overrideProvider(getModelToken('User'))
            .useValue(mockUserModel)
            .overrideProvider(getModelToken('Shop'))
            .useValue(mockShopModel)
            .compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('When calling service.create, and throw Error, required data is missing', () => {
        test('Then it should return the saved user', async () => {
            const mockBadUser = {
                email: 'test@test.test',
                password: 'password',
                address: 'test',
                payMethod: 'paypal',
                shopCart: '',
                wishList: [''],
                save: jest.fn(),
            };
            mockUserModel.create.mockResolvedValueOnce(null);

            expect(async () => {
                await service.create(mockBadUser);
            }).rejects.toThrow();
        });
    });

    describe('When calling service.create', () => {
        test('Then it should return the saved user', async () => {
            const result = await service.create(mockUser);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('When calling service.login with valid login info', () => {
        test('Then it should return the user data and token', async () => {
            const result = await service.login({
                email: mockUser.email,
                password: mockUser.password,
            });
            expect(result).toEqual(mockResponse);
        });
    });

    describe('When calling service.login with invalid email', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockUserModel.findOne.mockResolvedValueOnce(null);
            expect(async () => {
                await service.login({
                    email: mockUser.email,
                    password: mockUser.password,
                });
            }).rejects.toThrow();
        });
    });

    describe('When calling service.login with invalid password', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockBcrypt.compare.mockReturnValueOnce(false);
            expect(async () => {
                await service.login({
                    email: mockUser.email,
                    password: mockUser.password,
                });
            }).rejects.toThrow();
        });
    });

    describe('When calling service.loginWithToken with a valid token', () => {
        test('Then it should return the user data and token', async () => {
            const result = await service.loginWithToken('token');
            expect(result).toEqual(mockResponse);
        });
    });

    describe('When calling service.loginWithToken with invalid o expired token', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockAuth.validateToken.mockReturnValueOnce('error');
            expect(async () => {
                await service.loginWithToken('token');
            }).rejects.toThrow();
        });
    });

    describe('When calling service.loginWithToken with a valid token but user does not exist', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockUserModel.findById.mockResolvedValueOnce(null);
            expect(async () => {
                await service.loginWithToken('token');
            }).rejects.toThrow();
        });
    });
    describe('When calling service.find', () => {
        test('Then it should return the saved user', async () => {
            mockUserModel.find.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockReturnValue),
            });
            const result = await service.findAll();

            expect(result).toEqual(mockReturnValue);
        });
    });
    describe('When calling service.findOne', () => {
        test('Then it should return the saved user', async () => {
            mockUserModel.findById.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockReturnValue),
            });

            const result = await service.findOne('test');

            expect(result).toEqual(mockReturnValue);
        });
    });
    describe('When calling service.update', () => {
        test('Then it should return the saved user', async () => {
            const result = await service.update('test', mockUser);
            expect(result).toEqual({ ...mockUser, name: 'updated' });
        });
    });
    describe('When calling service.remove', () => {
        test('Then it should return the saved user', async () => {
            const result = await service.remove('test');

            expect(result).toEqual(mockUser);
        });
    });
});
