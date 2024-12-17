const API_URL = import.meta.env.VITE_API_URL as string;

export async function getProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
