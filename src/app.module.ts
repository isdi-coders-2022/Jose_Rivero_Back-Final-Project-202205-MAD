import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        UsersModule,
        ProductsModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.URL_MONGO),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
