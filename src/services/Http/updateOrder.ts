import { NewOrderProps } from '../../Pages/EditOrders';
import { api } from '../../config/axios.global';

export async function updateOrderById(id: string, data: NewOrderProps) {
  const response = await api.patch(`orders-products/${id}`, data);
}
