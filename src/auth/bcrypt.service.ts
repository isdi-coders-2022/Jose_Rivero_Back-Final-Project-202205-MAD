import { Injectable } from '@nestjs/common';
import { hashSync, compareSync } from 'bcryptjs';

@Injectable()
export class BcryptService {
    encrypt(password: string) {
        return hashSync(password);
    }

    compare(password: string, hash: string) {
        return compareSync(password, hash);
    }
}
