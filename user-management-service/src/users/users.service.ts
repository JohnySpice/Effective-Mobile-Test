import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { EEvents } from 'src/constants/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly redisService: RedisService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.gender = createUserDto.gender;
    user.email = createUserDto.email;
    user.age = createUserDto.age;
    await this.userRepository.save(user);
    this.redisService.pub({
      userId: user.id,
      event: EEvents.CREATE,
      field: null,
      oldValue: null,
      newValue: null,
    });
    return user;
  }

  findAll() {
    return this.userRepository.find();
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
    Object.entries(updateUserDto).forEach(
      ([key, value]) =>
        this.redisService.pub({
          userId: id,
          event: EEvents.UPDATE,
          field: key,
          oldValue: user[key],
          newValue: value,
        }),
      this,
    );
    return this.findById(id);
  }
}
