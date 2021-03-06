import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { AuthMiddleware } from './auth.middleware';

describe('Given AuthMiddleware', () => {
    const req = { get: jest.fn().mockReturnValue('bearer 9999') };
    const req1 = { get: jest.fn().mockReturnValue('') };
    const res: Response = {} as Response;
    const next: NextFunction = jest.fn();
    const mockAuthService = {
        validateToken: jest.fn().mockReturnValue('token'),
        createToken: jest.fn(),
    } as AuthService;
    const authMiddleware = new AuthMiddleware(mockAuthService);
    describe('When use function is called with correct token', () => {
        test('Then it should call next without error', () => {
            expect(() =>
                authMiddleware.use(req1 as unknown as Request, res, next)
            ).toThrow();
        });
    });
    describe('When use function is called with correct token', () => {
        test('Then it should call next without error', () => {
            (mockAuthService.validateToken as jest.Mock).mockReturnValueOnce(
                {}
            );
            authMiddleware.use(req as unknown as Request, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When use function is called with incorrect token', () => {
        test('Then it should throw an exception', () => {
            expect(() =>
                authMiddleware.use(req as unknown as Request, res, next)
            ).toThrow();
        });
    });
});
