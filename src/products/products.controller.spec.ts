import { Test, TestingModule } from '@nestjs/testing';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
    let controller: ProductsController;
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                {
                    provide: ProductsService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
        service = module.get<ProductsService>(ProductsService);
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
