import { Role } from '../config/roles';

export interface UserModel {
  id: number;
  username: string;
  role: Role;
  score: number;
  isInGame: boolean;
}
