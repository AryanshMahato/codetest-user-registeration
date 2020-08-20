import { HttpException, Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import { CreateUserDto } from './Dto/createUser.dto';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './Dto/LoginUserDto';
import fetch from 'node-fetch';

@Injectable()
export class UserService {
  saltRounds = 10;

  // Hashes the password
  async hashPassword(
    password: string,
  ): Promise<{ salt: string; password: string }> {
    const salt = await bcrypt.genSalt(this.saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    return {
      password: hashedPassword,
      salt,
    };
  }

  // Decodes the password
  async comparePassword({
    hashedPassword,
    plainPassword,
  }: {
    hashedPassword: string;
    plainPassword: string;
  }): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async registerUser(userData: CreateUserDto): Promise<User> {
    const { password, salt } = await this.hashPassword(userData.password);

    const userModel = new UserModel({
      email: userData.email,
      name: userData.name,
      password,
      salt,
    });

    const user = userModel.save();

    return user;
  }

  loginUser(userData: LoginUserDto): Promise<boolean> {
    const user = UserModel.find(userData.email);
    if (!user)
      throw new HttpException(
        { message: "Email doesn't exist! Please Register" },
        404,
      );
    return this.comparePassword({
      hashedPassword: user.password,
      plainPassword: userData.password,
    });
  }

  async generateToken(userData: { username: string; password: string }) {
    // const { data } = await tokenAPI.post('/location', { id: 15 });
    // console.log(data);

    const response = await fetch('http://localhost:3000/token', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    return await response.json();
  }
}
