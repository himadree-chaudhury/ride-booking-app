export interface IResponseError {
  status: number;
  message: string;
  trace_id: string;
  errors: string[];
  hints: string;
}