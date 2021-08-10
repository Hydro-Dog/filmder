export class ApiError {
  error: Error;
  headers: Headers;
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
}

interface Error {
  message: string;
  method: string;
  path: string;
  statusCode: number;
  timestamp: string;
}

interface Headers {}
