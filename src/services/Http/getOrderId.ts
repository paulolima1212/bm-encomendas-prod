import { api } from '../../config/axios.global';

export async function getMaxOrderId() {
  const data = await (await api.get('/orders/maxorder')).data;

  if (data.length === 0) {
    return 1;
  }

  return data[0].id + 1;
}
