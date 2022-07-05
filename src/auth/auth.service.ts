import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    createToken(id: string) {
        const secret = process.env.SECRET;
        return sign({ id }, secret, { expiresIn: '1h' });
    }

    validateToken(token: string) {
        const secret = process.env.SECRET;
        return verify(token, secret);
    }
}
