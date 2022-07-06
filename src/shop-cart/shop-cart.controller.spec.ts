import { Test, TestingModule } from '@nestjs/testing';
import { ShopCartController } from './shop-cart.controller';
import { ShopCartService } from './shop-cart.service';

describe('ShopCartController', () => {
    let controller: ShopCartController;
    let service: ShopCartService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ShopCartController],
            providers: [
                {
                    provide: ShopCartService,
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        updateAdd: jest.fn(),
                        updateRemove: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<ShopCartController>(ShopCartController);
        service = module.get<ShopCartService>(ShopCartService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('When calling controller.findOne', () => {
        test('Then service.findOne should be called', () => {
            controller.findOne('Testtest');

            expect(service.findOne).toHaveBeenCalled();
        });
    });
    describe('When calling controller.update', () => {
        test('Then service.update should be called', () => {
            controller.update('test', { product: 'tesst', quantity: 10 });

            expect(service.update).toHaveBeenCalled();
        });
    });
    describe('When calling controller.updateAdd', () => {
        test('Then service.updateAdd should be called', () => {
            controller.updateAdd('test', { product: 'tesst', quantity: 10 });

            expect(service.updateAdd).toHaveBeenCalled();
        });
    });
    describe('When calling controller.updateRemove', () => {
        test('Then service.updateRemove should be called', () => {
            controller.updateRemove('test', {
                product: 'tesst',
                quantity: 10,
            });

            expect(service.updateRemove).toHaveBeenCalled();
        });
    });
});
