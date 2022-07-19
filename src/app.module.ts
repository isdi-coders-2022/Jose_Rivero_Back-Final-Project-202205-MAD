/* istanbul ignore file */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { BcryptService } from './auth/bcrypt.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ShopCartModule } from './shop-cart/shop-cart.module';

@Module({
    imports: [
        UsersModule,
        ProductsModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.MONGO_USER}:${
                process.env.PASSWORD
            }@pruebajose.d3jjx.mongodb.net/${
                process.env.NODE_ENV === 'test'
                    ? process.env.TEST_DBNAME
                    : process.env.DBNAME
            }?retryWrites=true&w=majority`
        ),
        ShopCartModule,
    ],
    controllers: [AppController],
    providers: [AppService, AuthService, BcryptService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: 'users', method: RequestMethod.POST },
                { path: 'products', method: RequestMethod.ALL },
                { path: 'users/login', method: RequestMethod.POST }
            )
            .forRoutes('*');
    }
}
