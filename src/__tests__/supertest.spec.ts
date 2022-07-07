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

    //shopCart Test
    test('/shopcart (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/shopcart/${shopCartId}`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
    });

    test('/user/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
    });
    test('/user/:id badRequest (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete(`/users/${'sadsadasda'}`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(500);
    });
});
