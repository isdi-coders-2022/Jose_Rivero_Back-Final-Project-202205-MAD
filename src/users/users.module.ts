import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './entities/user.entity';
import { productSchema } from 'src/products/entities/product.entity';
import { BcryptService } from 'src/auth/bcrypt.service';
import { AuthService } from 'src/auth/auth.service';
import { shopSchema } from 'src/shop-cart/entities/shop-cart.entity';
import { ShopCartService } from 'src/shop-cart/shop-cart.service';
import { ShopCartController } from 'src/shop-cart/shop-cart.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: userSchema },
            { name: 'Product', schema: productSchema },
            { name: 'Shop', schema: shopSchema },
        ]),
    ],
    controllers: [UsersController, ShopCartController],
    providers: [UsersService, AuthService, BcryptService, ShopCartService],
})
export class UsersModule {}
