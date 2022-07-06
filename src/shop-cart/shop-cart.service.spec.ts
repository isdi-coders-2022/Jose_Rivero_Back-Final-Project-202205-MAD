import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { shopSchema } from './entities/shop-cart.entity';
import { ShopCartService } from './shop-cart.service';

describe('ShopCartService', () => {
    const mockReturnValue = 'tested';

    const mockShop = {
        id: 'test',
        products: ['Mantatermica', 20],
        owner: 'Jesus',
        save: jest.fn(),
        populate: jest.fn(),
    };
    const mockShopModel = {
        create: jest.fn().mockResolvedValue(mockShop),
        findOne: jest.fn().mockResolvedValue(mockShop),
        findById: jest.fn().mockResolvedValue(mockShop),
        findByIdAndUpdate: jest
            .fn()
            .mockResolvedValue({ ...mockShop, name: 'updated' }),
    };
    let service: ShopCartService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'Shop', schema: shopSchema },
                ]),
            ],
            providers: [ShopCartService],
        })
            .overrideProvider(getModelToken('Shop'))
            .useValue(mockShopModel)
            .compile();

        service = module.get<ShopCartService>(ShopCartService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('When calling service.create', () => {
        test('Then it should return the cart', async () => {
            const result = await service.create(mockShop);
            expect(result).toEqual(mockShop);
        });
    });
    describe('When calling service.findOne', () => {
        test('Then it should return the shopcart', async () => {
            mockShopModel.findById.mockReturnValueOnce({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue(mockReturnValue),
                }),
            });

            const result = await service.findOne('test');

            expect(result).toEqual(mockReturnValue);
        });
    });

    describe('When calling service.Update', () => {
        test('Then it should return the update cart', async () => {
            mockShopModel.findByIdAndUpdate.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockReturnValue),
            });

            const result = await service.update('test', {
                product: 'manta',
                quantity: 30,
            });

            expect(result).toEqual(mockReturnValue);
        });
    });
    describe('When calling service.UpdateAdd', () => {
        test('Then it should return the update cart', async () => {
            mockShopModel.findById.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockReturnValue),
            });

            const result = await service.update('test', {
                product: 'manta',
                quantity: 30,
            });

            expect(result).toEqual(mockReturnValue);
        });
    });
    describe('When calling service.UpdateRemove', () => {
        test('Then it should return the update cart', async () => {
            mockShopModel.findById.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockReturnValue),
            });

            const result = await service.update('test', {
                product: 'manta',
                quantity: 30,
            });

            expect(result).toEqual(mockReturnValue);
        });
    });
});
