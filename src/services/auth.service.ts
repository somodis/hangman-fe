import request, { Methods } from '../utils/request';
import { LoginCredentials, LoginResponse } from '../models/credentials.model';

class AuthService {
  private resource = 'auth';

  async login(data: LoginCredentials) {
    console.log('login req');
    return request<LoginResponse>({ resource: `${this.resource}/login`, data, method: Methods.POST });
  }

  async logout(data?: string | null) {
    console.log('logout req');
    return request<void>({ resource: `${this.resource}/logout`, data, method: Methods.POST });
  }
}
export const authService = new AuthService();
