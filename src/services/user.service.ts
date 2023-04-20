import { v4 as uuidv4 } from 'uuid';

import {
  QueryParamModel,
  UserModel,
  ListResponseModel,
  SignUpCredentialsModel,
  PasswordQuery,
  SetPasswordCredentialsModel,
  ForgotPasswordCredentialsModel,
  ChangePasswordModel,
} from 'models';
import request, { Methods } from 'utils/request';

import { arrayFilter, arraySort, getPage } from 'utils/arrays';
import { EntityService } from 'utils/entityService';
import { Role } from 'config/roles';
import { parse } from 'utils/base64';
import { wait } from 'utils/wait';
import { Env } from 'config/env';

const users: UserModel[] = [
  { id: 1, firstName: 'Elek', lastName: 'Teszt', email: 'teszt.elek@gmail.com' },
  { id: 2, firstName: 'Elek 2', lastName: 'Teszt', email: 'teszt.elek2@gmail.com' },
  { id: 3, firstName: 'Elek 3', lastName: 'Teszt', email: 'teszt.elek3@gmail.com' },
  { id: 4, firstName: 'Elek 4', lastName: 'Teszt', email: 'teszt.elek4@gmail.com' },
  { id: 5, firstName: 'Elek 5', lastName: 'Teszt', email: 'teszt.elek5@gmail.com' },
  { id: 6, firstName: 'Elek 6', lastName: 'Teszt', email: 'teszt.elek6@gmail.com' },
  { id: 7, firstName: 'Elek 7', lastName: 'Teszt', email: 'teszt.elek7@gmail.com' },
  { id: 8, firstName: 'Elek 8', lastName: 'Teszt', email: 'teszt.elek8@gmail.com' },
  { id: 9, firstName: 'Elek 9', lastName: 'Teszt', email: 'teszt.elek9@gmail.com' },
  { id: 10, firstName: 'Elek 10', lastName: 'Teszt', email: 'teszt.elek10@gmail.com' },
  { id: 11, firstName: 'Elek 11', lastName: 'Teszt', email: 'teszt.elek11@gmail.com' },
  { id: 12, firstName: 'Elek 12', lastName: 'Teszt', email: 'teszt.elek12@gmail.com' },
];

const findUser = (userList: UserModel[], id: ID) => {
  const userId = userList.findIndex((user) => user.id === id);

  if (userId === -1) {
    throw new Error('User not found!');
  }
  return userId;
};

class UserService extends EntityService {
  constructor() {
    super('users');
  }

  async register(data: SignUpCredentialsModel) {
    // return request<any>({
    //   method:Methods.POST,
    //   resource:`${this.resource}/registration`,
    //   data
    // })

    // API doesn't support registration at the moment
    await wait();
    return { success: true };
  }

  async validateToken(data: PasswordQuery) {
    return request<any>({
      resource: `${this.resource}/validate-token`,
      params: {
        email: data.email,
        token: data.token,
        lang: data.lang,
      },
    });
  }

  async setPassword({ email, token, lang, ...data }: SetPasswordCredentialsModel) {
    return request<any>({
      method: Methods.POST,
      resource: `${this.resource}/reset-password`,
      params: { email, token, lang },
      data,
    });
  }

  async forgotPassword(data: ForgotPasswordCredentialsModel) {
    return request<any>({
      method: Methods.POST,
      resource: `${this.resource}/forgot-password`,
      data,
    });
  }

  async changePassword({ email, currentPassword, newPassword, passwordConfirmation }: ChangePasswordModel) {
    return request<any>({
      method: Methods.PUT,
      resource: `${this.resource}/change-password?lang=${localStorage.getItem('i18nextLng')}`,
      data: {
        email,
        currentPassword,
        newPassword,
        passwordConfirmation,
      },
    });
  }

  async createUser(data: Partial<UserModel>) {
    await wait({ ms: 1000 });

    users.push({
      id: uuidv4(),
      ...data,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      password: data.password || '',
      email: data.email || '',
      role: data.role || Role.USER,
    });

    // return request<UserModel>({
    //   method: Methods.POST,
    //   resource: `${this.resource}`,
    //   data,
    // });
  }

  async editUser(id: ID, data: Partial<UserModel>) {
    await wait({ ms: 1000 });

    const editedUserId = findUser(users, id);
    users[editedUserId] = { ...users[editedUserId], ...data };

    // return request<UserModel>({
    //   method: Methods.PUT,
    //   resource: `${this.resource}`,
    //   data,
    // });
  }

  async deleteUser(id: ID) {
    await wait({ ms: 1000 });
    const deleteUserId = findUser(users, id);

    users.splice(deleteUserId, 1);

    // return request({
    //   method: Methods.DELETE,
    //   resource: `${this.resource}/${id}`,
    // });
  }

  async getProfile() {
    if (Env.REACT_APP_USE_API) {
      const user = await request<UserModel>({
        method: Methods.GET,
        resource: `${this.resource}/me`,
      });

      // API doesn't support roles at the moment
      user.role = Role.ADMIN;

      return user;
    }

    return wait({
      data: {
        firstName: 'User',
        lastName: 'Teszt',
        email: 'user@test.com',
        role: Role.ADMIN,
      },
    });
  }

  getUserList = async (params?: QueryParamModel | null) => {
    const filter = parse(params?.filter);

    const filteredUsers = Object.keys(filter).reduce((data, key) => {
      return arrayFilter(data, [key as keyof UserModel], filter[key]);
    }, users);

    const searchedUsers = arrayFilter(filteredUsers, ['email', 'firstName', 'lastName'], params?.search);
    const sortedUsers = arraySort(searchedUsers, params?.sortBy as keyof UserModel, params?.order);
    const userListPage = getPage(sortedUsers, params?.page, params?.pageSize);

    await wait({ ms: 1000 });

    return {
      data: userListPage,
      count: users.length,
    } as ListResponseModel<UserModel>;
  };
}

export const userService = new UserService();
