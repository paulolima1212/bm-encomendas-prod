import { api } from '../../config/axios.global';

export async function getMaxOrderId() {
  const data = await (await api.get('/orders/maxorder')).data;

  return data[0].id + 1;
}
