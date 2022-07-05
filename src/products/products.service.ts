import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { iProduct } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel('Product') private readonly Product: Model<iProduct>
    ) {}

    async create(createProductDto: CreateProductDto) {
        return this.Product.create(createProductDto);
    }

    async findAll() {
        return this.Product.find({});
    }

    async findOne(id: string) {
        return this.Product.findById(id);
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        return this.Product.findByIdAndUpdate(id, updateProductDto, {
            new: true,
        });
    }

    async remove(id: string) {
        return this.Product.findByIdAndDelete(id);
    }
}
