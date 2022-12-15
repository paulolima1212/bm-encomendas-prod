import { NewOrderProps } from '../../Pages/EditOrders';
import { api } from '../../config/axios.global';

export async function deleteOrderById(id: number) {
  const response = await api.delete(`orders-products/${id}`);
}
