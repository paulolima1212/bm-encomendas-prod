import { api } from '../../config/axios.global';

export async function createNewOrder(order: any) {
  return await (
    await api.post('orders-products', order)
  ).data;
}
