import { User } from './interface/user.interface';
import { HttpException } from '@nestjs/common';

export class UserModel {
  constructor(private readonly user: User) {}

  save(): User {
    if (users.find(({ email }) => email === this.user.email)) {
      throw new HttpException({ message: 'Duplicate email Address!' }, 409);
    }
    users.push(this.user);
    console.log(users);
    return this.user;
  }

  public static find(email: string): User | null {
    return users.find((user) => user.email === email);
  }
}

const users: Array<User> = [];
