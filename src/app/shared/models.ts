export interface ApiResponse<T> {
  result: T;
  status: {
    status: number;
    message: string;
    requestId: string;
    data: any;
  };
}
