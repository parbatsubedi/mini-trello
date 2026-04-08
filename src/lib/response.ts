import type { LinksType, MetaType } from '../types/types';

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  status: string;
  message: string;
  data: T[];
  links: LinksType;
  meta: MetaType;
}

export interface DeleteResponse {
  status: string;
  message: string;
  data: null;
}

export interface ErrorResponse {
  status: string;
  message: string;
  data: null;
}

export type ResponseType<T> = 
  | ApiResponse<T>
  | PaginatedResponse<T>
  | DeleteResponse
  | ErrorResponse
  | T
  | T[];

export function isPaginatedResponse(response: any): response is PaginatedResponse<any> {
  return response && 'meta' in response && 'links' in response;
}

export function isWrappedResponse(response: any): response is ApiResponse<any> {
  return response && 'status' in response && 'message' in response;
}

export function isDeleteResponse(response: any): response is DeleteResponse {
  return response && response.status === 'success' && response.data === null;
}

export function isErrorResponse(response: any): response is ErrorResponse {
  return response && response.status === 'error';
}

export function isSingleRecord(response: any): boolean {
  return isWrappedResponse(response) && !isPaginatedResponse(response) && !isDeleteResponse(response);
}

export function isArrayResponse(response: any): boolean {
  return Array.isArray(response);
}

export function unwrapResponse(response: any): {
  data: any;
  meta?: MetaType;
  links?: LinksType;
  status: string;
  message: string;
} {
  if (!response) {
    return { data: null, status: 'error', message: 'No response' };
  }

  if (isDeleteResponse(response)) {
    return { data: null, status: response.status, message: response.message };
  }

  if (isErrorResponse(response)) {
    return { data: null, status: response.status, message: response.message };
  }

  if (isWrappedResponse(response)) {
    if (isPaginatedResponse(response)) {
      return {
        data: response.data,
        meta: response.meta,
        links: response.links,
        status: response.status,
        message: response.message,
      };
    }

    return {
      data: response.data,
      status: response.status,
      message: response.message,
    };
  }

  if (isArrayResponse(response)) {
    return { data: response, status: 'success', message: '' };
  }

  return { data: response, status: 'success', message: '' };
}

export function extractData<T>(response: any): T | T[] | null {
  const { data } = unwrapResponse(response);
  return data as T | T[] | null;
}

export function extractPaginatedData<T>(response: any): {
  data: T[];
  meta: MetaType;
  links: LinksType;
} | null {
  const unwrapped = unwrapResponse(response);
  
  if (unwrapped.meta && unwrapped.links) {
    return {
      data: unwrapped.data as T[],
      meta: unwrapped.meta,
      links: unwrapped.links,
    };
  }
  
  return null;
}

export function extractSingleData<T>(response: any): T | null {
  const unwrapped = unwrapResponse(response);
  
  if (unwrapped.data !== null && !Array.isArray(unwrapped.data)) {
    return unwrapped.data as T;
  }
  
  return null;
}