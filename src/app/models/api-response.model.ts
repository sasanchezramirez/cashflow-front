export interface ApiResponse<T> {
  apiCode: string;
  data: T;
  message: string;
  status: boolean;
}
