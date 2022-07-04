import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
