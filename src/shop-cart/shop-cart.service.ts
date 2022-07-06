import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { CreateShopCartDto } from './dto/create-shop-cart.dto';
import { UpdateShopCartDto } from './dto/update-shop-cart.dto';
import { iShop } from './entities/shop-cart.entity';

@Injectable()
export class ShopCartService {
    constructor(@InjectModel('Shop') private readonly Shop: Model<iShop>) {}

    async create(createShopCartDto: CreateProductDto) {
        return await this.Shop.create(createShopCartDto);
    }

    async findOne(id: string) {
        const populate = {
            path: 'products',
            populate: {
                path: 'product',
            },
        };

        return await (
            await (await this.Shop.findById(id)).populate('owner', 'name')
        ).populate(populate);
    }

    async update(id: string, updateProductDto: UpdateShopCartDto) {
        return this.Shop.findByIdAndUpdate(id, updateProductDto, {
            new: true,
        }).populate('owner', 'name');
    }
    async updateAdd(id: string, updateProductDto: UpdateShopCartDto) {
        const cart = await this.Shop.findById(id);

        cart.products.push(updateProductDto);
        cart.save();
        return cart.populate('owner', 'name');
    }
    async updateRemove(id: string, updateProductDto: UpdateShopCartDto) {
        const cart = await this.Shop.findById(id);

        cart.products = cart.products.filter(
            (item) => String(item.product) !== updateProductDto.product
        );

        cart.save();
        return cart.populate('owner', 'name');
    }
}
