import { Role } from '../config/roles';
import { UserModel } from '../models/user.model';
import request, { Methods } from '../utils/request';

class UserService {
  private resource = 'users';
  async getProfile() {
    console.log('getProfile');
    const user = await request<UserModel>({
      method: Methods.GET,
      resource: `${this.resource}/me`,
    });

    // temp
    user.role = Role.ADMIN;

    return user;
  }
}

export const userService = new UserService();
