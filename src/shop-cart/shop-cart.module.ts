/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';
import { ShopCartController } from './shop-cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../users/entities/user.entity';
import { productSchema } from '../products/entities/product.entity';
import { shopSchema } from './entities/shop-cart.entity';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: userSchema },
            { name: 'Product', schema: productSchema },
            { name: 'Shop', schema: shopSchema },
        ]),
    ],
    controllers: [ShopCartController],
    providers: [ShopCartService, AuthService, BcryptService],
})
export class ShopCartModule {}
