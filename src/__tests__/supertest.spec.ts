/* istanbul ignore file */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('Given the routes /users & /shopcart & /products', () => {
    const auth = new AuthService();
    let app: INestApplication;
    let userToken: string;
    const badToken = 'hola';

    let userId: string;
    let shopCartId: string;
    let productId: string;
    const mockUser = {
        name: 'Prueba USer',

        email: 'isdiri@isdi.com',
        password: '123456',
        address: 'Hacienda Isdi',
        payMetho: 'Corazon',
        wishList: [],
    };
    const mockBadUser = {
        email: 'test@test.test',
        password: 'password',
        address: 'test',
        payMethod: 'paypal',
    };
    const mockProduct = {
        name: 'MANTA TERMICA',
        price: 10,
        onSale: false,
        category: 'Accessories',
        stock: 30,
        color: 'black',
        size: 'L',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    test('/users (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/users')
            .send(mockUser)
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        userId = response.body.user._id;
        shopCartId = response.body.user.shopCart;
    });
    test('/users badRequest (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/users')
            .send(mockBadUser)
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
    });

    test('/users/login (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/users/login')
            .send({
                email: 'isdiri@isdi.com',
                password: '123456',
            })
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        userToken = auth.createToken(userId);
    });
    test('/users/login badRequest (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/users/login')
            .send({
                email: 'test@test.test',
                password: '5382472',
            })
            .set('Accept', 'application/json');
        expect(response.status).toBe(401);
    });
    test('/users (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/users`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
    });
    test('/users badRequest (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/users`)
            .set('Authorization', `bearer ${badToken}`);
        expect(response.status).toBe(401);
    });
    test('/users/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/users/${userId}`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
    });
    test('/users/:id  badRequest (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/users/${userId}`)
            .set('Authorization', `bearer ${badToken}`);
        expect(response.status).toBe(401);
    });
    test('/users/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch(`/users/${userId}`)
            .send({ name: 'updated name' })
            .set('Authorization', `bearer ${userToken}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('updated name');
    });
    test('/users/:id badRequest (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch(`/users/${userId}`)
            .send({ name: 'updated name' })
            .set('Authorization', `bearer ${badToken}`);

        expect(response.status).toBe(401);
    });

    //products test
    test('/products (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/products')
            .send(mockProduct)
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        productId = response.body._id;
    });
    test('/products (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/products`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
    });
    test('/products/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/products/${productId}`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
    });
    test('/products/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch(`/products/${productId}`)
            .send({ name: 'products UPDATE name' })
            .set('Authorization', `bearer ${userToken}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('products UPDATE name');
    });

    //shopCart Test
    test('/shopcart (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/shopcart/${shopCartId}`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
    });
    test('/shopcart add/ (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch(`/shopcart/add/${shopCartId}`)
            .send({ product: productId, quantity: 20 })
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
        expect(response.body.products[0].product).toBe(productId);
    });
    test('/shopcart remove(PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch(`/shopcart/remove/${shopCartId}`)
            .send({ product: productId, quantity: 20 })
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
    });
    test('/shopcart (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch(`/shopcart/${shopCartId}`)
            .send({ products: [] })
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
        expect(response.body.products).toHaveLength(0);
    });

    //delete

    test('/user/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
    });
    test('/user/:id badRequest (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete(`/users/${'62c4405e3c269d63bb2fc8b9'}`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(404);
    });

    test('/products/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete(`/products/${productId}`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
    });
});
