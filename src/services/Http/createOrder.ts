import { NewOrderProps } from '../../Pages/Home';
import { api } from '../../config/axios.global';

export async function createNewOrder(order: NewOrderProps) {
  return await (
    await api.post('orders-products', order)
  ).data;
}
