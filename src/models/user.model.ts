import { Role } from '../config/roles';

export interface UserModel {
  id?: number;
  username?: string;
  password?: string;
  role?: Role;
}
