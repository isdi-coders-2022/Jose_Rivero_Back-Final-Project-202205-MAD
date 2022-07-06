import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { productSchema } from './entities/product.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
    const mockProduct = {
        id: 'test',
        name: 'test',
        price: 10,
        onSale: false,
        category: 'Accessories',
        stock: 30,
        color: 'black',
        size: 'L',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    };
    const mockProductModel = {
        create: jest.fn().mockResolvedValue(mockProduct),
        find: jest.fn().mockResolvedValue(mockProduct),
        findOne: jest.fn().mockResolvedValue(mockProduct),
        findById: jest.fn().mockResolvedValue(mockProduct),
        findByIdAndUpdate: jest
            .fn()
            .mockResolvedValue({ ...mockProduct, name: 'updated' }),
        findByIdAndDelete: jest.fn().mockResolvedValue(mockProduct),
    };
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'Product', schema: productSchema },
                ]),
            ],
            providers: [ProductsService],
        })
            .overrideProvider(getModelToken('Product'))
            .useValue(mockProductModel)
            .compile();

        service = module.get<ProductsService>(ProductsService);
    });
    describe('When calling service.create', () => {
        test('Then it should return the new product', async () => {
            const result = await service.create(mockProduct);
            expect(result).toEqual(mockProduct);
        });
        describe('When calling service.findAll', () => {
            test('Then it should return all products ', async () => {
                const result = await service.findAll();

                expect(result).toEqual(mockProduct);
            });
        });
        describe('When calling service.findOne', () => {
            test('Then it should return the product', async () => {
                const result = await service.findOne('test');

                expect(result).toEqual(mockProduct);
            });
        });
        describe('When calling service.update', () => {
            test('Then it should return the new product', async () => {
                const result = await service.update('test', mockProduct);
                expect(result).toEqual({ ...mockProduct, name: 'updated' });
            });
        });
        describe('When calling service.remove', () => {
            test('Then it should return the saved user', async () => {
                const result = await service.remove('test');

                expect(result).toEqual(mockProduct);
            });
        });
    });
});
