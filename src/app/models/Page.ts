export interface Page<T> {
  content: T[];
  number: number;
  size: number;
  numberOfElements?:number;
  totalElements: number;
  totalPages: number;

}