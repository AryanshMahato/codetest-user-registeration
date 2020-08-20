import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dto/createUser.dto';
import { LoginUserDto } from './Dto/LoginUserDto';
import { Token } from './interface/user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user/register')
  async registerUser(
    @Body() createUser: CreateUserDto,
  ): Promise<{ user: { name: string; email: string } }> {
    const user = await this.userService.registerUser(createUser);

    return {
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }

  @Post('user/login')
  async loginUser(
    @Body() loginUser: LoginUserDto,
  ): Promise<{ message: string; token: any }> {
    const isAuthenticated = await this.userService.loginUser(loginUser);

    if (isAuthenticated) {
      const token = await this.userService.generateToken({
        username: loginUser.email,
        password: loginUser.password,
      });

      return { message: 'Authentication Successful!', token };
    }

    throw new HttpException({ message: 'User or email is wrong' }, 403);
  }
}
