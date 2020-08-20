import { InputUser, User } from './interface/user.interface';
import { HttpException } from '@nestjs/common';
import fetch from 'node-fetch';

export class UserModel {
  constructor(private readonly user: InputUser) {}

  async save(): Promise<User> {
    if (users.find(({ email }) => email === this.user.email)) {
      throw new HttpException({ message: 'Duplicate email Address!' }, 409);
    }

    const cartId = await this.createCart();

    const createdUser = { ...this.user, cartId };

    users.push(createdUser);
    return createdUser;
  }

  private async createCart(): Promise<string> {
    const response = await fetch('http://localhost:5000/cart', {
      method: 'POST',
      body: JSON.stringify({ username: this.user.email }),
    });

    const data = await response.json();
    return data.cartId;
  }

  public static find(email: string): User | null {
    return users.find((user) => user.email === email);
  }
}

const users: Array<User> = [];
