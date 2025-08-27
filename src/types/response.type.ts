import type { IPaginate } from "./paginate.type";

export interface IResponse<T> {
  success: boolean;
  status: number;
  message: string;
  traceId: string;
  data: T;
  meta?: IPaginate;
}
