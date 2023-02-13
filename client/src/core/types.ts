export type Product = {
  name: string;
  color: string[];
  price: number;
  category: string;
  src: string;
};

export type Pagination = {
  previous?: {
    page: number;
    limit: number;
  };
  next?: {
    page: number;
    limit: number;
  };
  page: number; //current page
  totalPages: number;
};

export type ProductRespone = {
  products: Product[];
  maxPrice: number;
  previous?: {
    page: number;
    limit: number;
  };
  next?: {
    page: number;
    limit: number;
  };
  itemCounts:{
    totalResults:number;
    [key:string]:number;
  }
  page: number; //current page
  totalPages: number;

};

export type ProductSort = "name" | "priceAsc" | "priceDesc";
