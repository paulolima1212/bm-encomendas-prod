import { api } from '../../config/axios.global';

export interface DataOrderByProductProps {
  id: number;
  client: string;
  dateDelivery: string;
  quantity: string;
  weight: string;
}

export async function getOrderByProduct(product: string) {
  const data: DataOrderByProductProps[] = await (
    await api.get(`orders-products/list/orderbyproduct/${product}`)
  ).data;

  return data;
}
