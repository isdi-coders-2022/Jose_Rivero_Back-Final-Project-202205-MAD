import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { JwtPayload } from 'jsonwebtoken';

describe('Given the routes /users', () => {
    const auth = new AuthService();
    let app: INestApplication;
    let userToken: string;

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

    /* 
describe('When method GET is used', () => {
        test('If I am not logged, then status should be 401', async () => {
            const response = await request(app).get('/Users/');
            //.expect(401);
            expect(response.statusCode).toBe(401);
        });

request(app).get('/task/:id');
request(app).post('/task/');

request(app).patch('/task/:id');

request(app).delete('/task/:id');




    test('/user (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user')
            .send()
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        userId = (
            AuthService.prototype.validateToken(
                userToken,
            ) as JwtPayload
        ).id;
    });

    test('/user/login (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user/login')
            .send({
                email: 'user1@test.com',
                password: '123456',
            })
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        userToken = auth.createToken(userId);
        console.log(userToken);
    });

    test('/user (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/user`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
    });

    test('/user/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/user/${userId}`)
            .set('Authorization', `bearer ${userToken}`);
        expect(response.status).toBe(200);
    });

    test('/user/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch(`/user/${userId}`)
            .send({ name: 'updated name' })
            .set('Authorization', `bearer ${userToken}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('updated name');
    });

    test('/user/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete(`/user/${userId}`)
            .send(mockUser)
            .set('Accept', 'application/json')
            .set('Authorization', `bearer ${userToken}`);

        expect(response.status).toBe(200);
    }); */
});
