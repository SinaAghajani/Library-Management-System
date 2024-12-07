// src/users/users.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // بررسی اینکه آیا کاربری با این نام کاربری وجود دارد یا نه
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // هش کردن پسورد
    const hashedPassword = await this.hashPassword(createUserDto.password);

    // ایجاد کاربر جدید
    const user = new this.userModel({
      username: createUserDto.username,
      password: hashedPassword,
      role: createUserDto.role, // اگر فیلدهای بیشتری دارید می‌توانید به همین صورت اضافه کنید
    });

    return user.save();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
