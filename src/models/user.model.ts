import { Role } from '../config/roles';

export interface UserModel {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: Role;
}
