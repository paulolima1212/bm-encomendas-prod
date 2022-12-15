import { api } from '../../config/axios.global';

export async function getAllProductsVariant(variant: string) {
  const data = (await api.get(`products/name/${variant.replace(' ', '%20')}`))
    .data;
  return data;
}
