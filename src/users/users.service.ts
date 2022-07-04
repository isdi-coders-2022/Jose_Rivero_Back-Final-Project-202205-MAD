import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { BcryptService } from 'src/auth/bcrypt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { iUser } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly User: Model<iUser>,
        private readonly auth: AuthService,
        private readonly bcrypt: BcryptService
    ) {}

    async create(createUserDto: CreateUserDto) {
        const newUser = await this.User.create({
            ...createUserDto,
            password: this.bcrypt.encrypt(createUserDto.password),
        });
        const token = this.auth.createToken(newUser.id);
        return {
            user: newUser,
            token,
        };
    }
    async login(loginData: { email: string; password: string }) {
        const user = await this.User.findOne({
            email: loginData.email,
        }).populate('tasks');
        if (
            user === null ||
            !this.bcrypt.compare(loginData.password, user.password)
        )
            throw new UnauthorizedException('Password or email incorrect.');
        const token = this.auth.createToken(user.id);
        return {
            user,
            token,
        };
    }

    async loginWithToken(token: string) {
        try {
            const tokenData = this.auth.validateToken(
                token.substring(7)
            ) as JwtPayload;
            if (typeof tokenData === 'string')
                throw new UnauthorizedException();
            const user = await this.User.findById(tokenData.id).populate(
                'tasks'
            );
            if (user === null)
                throw new NotFoundException('User does not exist.');
            const newToken = this.auth.createToken(user.id);
            return {
                user,
                token: newToken,
            };
        } catch (ex) {
            throw new UnauthorizedException('Session expired');
        }
    }

    findAll() {
        return this.User.find({});
    }

    findOne(id: number) {
        return this.User.findById(id);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.User.findByIdAndUpdate(id, updateUserDto, { new: true });
    }

    remove(id: number) {
        return this.User.findByIdAndDelete(id);
    }
}
