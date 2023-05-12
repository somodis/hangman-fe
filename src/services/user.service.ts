import { UserModel } from '../models/user.model';
import request, { Methods } from '../utils/request';

class UserService {
  private resource = 'users';

  async getProfile() {
    const user = await request<UserModel>({
      method: Methods.GET,
      resource: `${this.resource}/me`,
    });

    return user;
  }

  async getUserScoreboard() {
    return request<UserModel[]>({ resource: `${this.resource}/scoreboard`, method: Methods.GET });
  }

  async saveUserScore(userId: number, score: number) {
    return request<UserModel>({
      resource: `${this.resource}/${userId}`,
      data: { id: userId, score: score, isInGame: false },
      method: Methods.PATCH,
    });
  }
}

export const userService = new UserService();
