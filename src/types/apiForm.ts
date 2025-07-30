export interface ApiResponse<T = unknown> {
  statusCode: number;
  error: unknown;
  message: string;
  data?: T;
}