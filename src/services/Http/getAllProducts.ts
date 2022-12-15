import { api } from '../../config/axios.global';

export async function getAllProducts() {
  const data = (await api.get('products')).data;
  return data;
}
