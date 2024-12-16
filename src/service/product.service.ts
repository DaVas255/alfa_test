import { API_URL } from '@/app/constants';
import { IProduct } from '@/app/types';

export async function getProducts() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
