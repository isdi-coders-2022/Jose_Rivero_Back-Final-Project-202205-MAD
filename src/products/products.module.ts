import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productSchema } from './entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/users/entities/user.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Product', schema: productSchema },
            { name: 'User', schema: userSchema },
        ]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
