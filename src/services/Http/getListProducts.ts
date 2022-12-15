import { api } from '../../config/axios.global';
import { ListProducts } from '../../Pages/Production';

export async function getListProducts() {
  const data: ListProducts[] = await (
    await api.get('orders-products/list/listproducts')
  ).data;

  return data;
}
