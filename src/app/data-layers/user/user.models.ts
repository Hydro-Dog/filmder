import { ID } from '@datorama/akita';

export interface User {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  id?: ID;
}

export interface UserRO {
  id: ID;
  created: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  accessToken: string;
  refreshToken: string;
}
