import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';
import { iShop } from '../shop-cart/entities/shop-cart.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { iUser } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly User: Model<iUser>,
        @InjectModel('Shop') private readonly Shop: Model<iShop>,
        private readonly auth: AuthService,
        private readonly bcrypt: BcryptService
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const newUser = await this.User.create({
                ...createUserDto,
                password: this.bcrypt.encrypt(createUserDto.password),
            });
            const newShop = await this.Shop.create({ owner: newUser._id });
            newUser.shopCart = newShop.id;
            newUser.save();
            const token = this.auth.createToken(newUser.id);
            return {
                user: newUser,
                token,
            };
        } catch (error) {
            throw new BadRequestException('Error, required data is missing');
        }
    }
    async login(loginData: { email: string; password: string }) {
        const user = await this.User.findOne({
            email: loginData.email,
        });
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
            const user = await this.User.findById(tokenData.id);
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

    async findAll() {
        return this.User.find().populate('shopCart');
    }

    async findOne(id: string) {
        return this.User.findById(id).populate('shopCart');
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return this.User.findByIdAndUpdate(id, updateUserDto, { new: true });
    }

    async remove(id: string) {
        const cart = await this.Shop.findOne({ owner: id });
        if (!cart) throw new NotFoundException('User does not exist.');
        cart.delete();
        return this.User.findByIdAndDelete(id);
    }
}
