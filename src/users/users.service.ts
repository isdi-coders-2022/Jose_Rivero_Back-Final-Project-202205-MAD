import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { iUser } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly User: Model<iUser>) {}
    async create(createUserDto: CreateUserDto) {
        return this.User.create(createUserDto);
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
