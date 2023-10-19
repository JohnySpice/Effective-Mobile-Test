import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.gender = createUserDto.gender;
    user.email = createUserDto.email;
    user.age = createUserDto.age;
    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }
  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.save({
      id: id,
      ...updateUserDto,
    });
    return this.findById(id);
  }
}
