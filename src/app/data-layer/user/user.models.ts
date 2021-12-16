import { ID } from '@datorama/akita';

// export interface User {
//   userName: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   password?: string;
//   id?: number;
//   currentMatchSession: string;
// }

// export interface UserRO {
//   id: number;
//   currentMatchSession: string;
//   created: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   userName: string;
//   accessToken: string;
//   refreshToken: string;
// }

export interface UserEntity {
  id: string;
  created: string;
  updated: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  currentMatchSession: string;
  invites: string[];
  hosted: string[];
  emailConfirmed: boolean;
}

export class CreateUserDTO {
  readonly password: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
}

export class LoginUserDTO {
  readonly password: string;
  readonly email: string;
}
