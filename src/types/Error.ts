export interface CustomErrorResponse {
  errors: {
    message: string;
    field?: string;
  }[];
}
