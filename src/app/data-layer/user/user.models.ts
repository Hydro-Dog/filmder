import { ID } from '@datorama/akita';

export interface User {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  id?: number;
  currentMatchSession: string;
}

export interface UserRO {
  id: number;
  currentMatchSession: string;
  created: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  accessToken: string;
  refreshToken: string;
}
