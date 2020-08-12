import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('User Controller', function () {
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    userController = new UserController(userService);
  });

  describe('User Registration', () => {
    it('should register the user', async () => {
      const result = {
        name: 'Arya Stark',
        email: 'anyone@gmail.com',
        password: 'lkajs',
        salt: 'ajslkdjal',
      };
      jest
        .spyOn(userService, 'registerUser')
        .mockImplementation(async () => result);

      expect(
        await userController.registerUser({
          name: 'Arya Stark',
          email: 'anyone@gmail.com',
          password: 'Aryansh',
        }),
      ).toEqual({ user: { name: 'Arya Stark', email: 'anyone@gmail.com' } });
    });
  });
});
