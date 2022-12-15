import { NewOrderProps } from '../../Pages/EditOrders';
import { api } from '../../config/axios.global';

export async function getOrderById(id: string) {
  const data: NewOrderProps = (await api.get(`orders/order/${id}`)).data;
  return data;
}
