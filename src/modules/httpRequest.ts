import { QueryType } from '@/types';

/**
 * HTTP GET Request
 * @param url
 * @param query Query object
 * @param requestOptions RequestInit
 * @returns Resolved data
 */
export async function getRequest<T = any>(
  url: string,
  query?: QueryType,
  requestOptions?: RequestInit
): Promise<T> {
  console.log(`${url}${query ? `?${String(new URLSearchParams(query))}` : ''}`);
  return (
    await fetch(`${url}${query ? `?${String(new URLSearchParams(query))}` : ''}`, requestOptions)
  ).json();
}

/**
 * HTTP POST Request
 * @param url
 * @param body
 * @param requestOptions RequestInit
 * @returns Resolved data
 */
export async function postRequest<T = any>(
  url: string,
  body?: any,
  requestOptions?: RequestInit
): Promise<T> {
  return (
    await fetch(url, {
      ...requestOptions,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...requestOptions?.headers,
      },
      body: JSON.stringify(body),
    })
  ).json();
}

/**
 * HTTP PUT Request
 * @param url
 * @param body
 * @param requestOptions RequestInit
 * @returns Resolved data
 */
export async function putRequest<T>(
  url: string,
  body?: any,
  requestOptions?: RequestInit
): Promise<T> {
  return (
    await fetch(url, {
      ...requestOptions,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...requestOptions?.headers,
      },
      body: JSON.stringify(body),
    })
  ).json();
}

/**
 * HTTP DELETE Request
 * @param url
 * @param query Query object
 * @param requestOptions RequestInit
 * @returns Resolved data
 */
export async function deleteRequest<T = any>(
  url: string,
  query?: QueryType,
  requestOptions?: RequestInit
): Promise<T> {
  return (
    await fetch(`${url}${query ? `?${String(new URLSearchParams(query))}` : ''}`, {
      ...requestOptions,
      method: 'DELETE',
    })
  ).json();
}
