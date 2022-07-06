/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './entities/user.entity';

import { BcryptService } from '../auth/bcrypt.service';
import { AuthService } from '../auth/auth.service';
import { shopSchema } from '../shop-cart/entities/shop-cart.entity';
import { ShopCartService } from '../shop-cart/shop-cart.service';
import { ShopCartController } from '../shop-cart/shop-cart.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: userSchema },
            { name: 'Shop', schema: shopSchema },
        ]),
    ],
    controllers: [UsersController, ShopCartController],
    providers: [UsersService, AuthService, BcryptService, ShopCartService],
})
export class UsersModule {}
