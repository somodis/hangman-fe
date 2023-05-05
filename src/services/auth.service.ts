import request, { Methods } from '../utils/request';
import { LoginCredentials, TokenResponse } from '../models/credentials.model';

class AuthService {
    async login(data: LoginCredentials) {
        return request<TokenResponse>({ resource: 'auth/login', data, method: Methods.POST });
    }
}
export const authService = new AuthService();


