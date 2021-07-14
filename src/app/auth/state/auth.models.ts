import { ID } from '@datorama/akita';

export interface User {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  token?: string;
  id?: ID;
}
