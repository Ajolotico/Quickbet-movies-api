import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { encodeString } from '../../shared/services/bcrypt.service';

@Injectable()
export class UsersService {
  private mainRepo: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.mainRepo = dataSource.getRepository(User);
  }

  async create(createUserDto: CreateUserDto) {
    const { password, email, first_name, last_name } = createUserDto;

    if (!email || !password || !first_name || !last_name)
      throw new BadRequestException('Missing required fields');

    await this.mainRepo
      .findOne({
        select: [
          'email',
          'first_name',
          'last_name',
          'is_active',
          'created_at',
          'updated_at',
        ],
        where: {
          email: email,
        },
      })
      .then((user) => {
        if (user) {
          throw new BadRequestException('Email already exists');
        }
      });

    const newUser: User = await this.mainRepo.save({
      first_name: first_name,
      last_name: last_name,
      email: email?.trim(),
      password: encodeString(password),
    });

    delete newUser.password;
    return newUser;
  }

  async findAll() {
    return this.mainRepo.find({
      select: [
        'email',
        'first_name',
        'last_name',
        'is_active',
        'created_at',
        'updated_at',
      ],
      where: {
        is_active: true,
      },
    });
  }

  async findOne(id: number) {
    return this.mainRepo.findOne({
      select: [
        'email',
        'first_name',
        'last_name',
        'is_active',
        'created_at',
        'updated_at',
      ],
      where: {
        is_active: true,
        user_id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.mainRepo.update(id, {
      ...updateUserDto,
    });
  }

  async remove(id: number) {
    return this.mainRepo.update(id, {
      is_active: false,
    });
  }

  async searchUserByPass(email: string) {
    return this.mainRepo.findOne({
      where: {
        email: email,
        is_active: true,
      },
    });
  }
}
