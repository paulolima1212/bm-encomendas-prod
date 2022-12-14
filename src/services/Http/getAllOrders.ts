import { NewOrderProps } from '../../Pages/Home';
import { api } from '../../config/axios.global';

export async function getAllOrder() {
  const data: NewOrderProps[] = (await api.get('orders/all')).data;
  return data;
}
