import { api } from '../../config/axios.global';

export async function sendMessage(data: any) {
  const response = await api.post('orders/new/sendmessage', data);
}
