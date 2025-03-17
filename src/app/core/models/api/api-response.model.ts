export interface ApiResponse<T> {
  status: boolean;
  apiCode: string;
  message?: string;
  data: T;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
