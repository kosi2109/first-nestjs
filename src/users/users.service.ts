import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Si Thu',
      email: 'sithuhtet@gmail.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0)
        throw new NotFoundException('User Role Not Found');

      return rolesArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id == id);

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  create(user: CreateUserDto) {
    const highestId = [...this.users]?.sort((a, b) => b.id - a.id);

    const newUser = { id: highestId[0]?.id + 1, ...user };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, updateUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id == id) {
        return { ...user, ...updateUser };
      }

      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const user = this.users.find((user) => user.id == id);

    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
