export interface LoginCredentials {
  username: string;
  password: string;
}

export interface TokenType {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  token: TokenType;
}
