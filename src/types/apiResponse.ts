export interface LinksType {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface MetaLinksType {
  url: string | null;
  label: string;
  active: boolean;
  page: number | null;
}

export interface MetaType {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLinksType[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

// Generic API Response
export interface ApiResponse<T> {
  data: T;
  links: LinksType;
  meta: MetaType;
}