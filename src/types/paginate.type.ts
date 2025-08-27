export interface IPaginate {
  totalDocs: number;
  filteredDocs: number;
  limit: number;
  currentPage: number;
  totalPages: number;
}
