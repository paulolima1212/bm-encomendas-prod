import { api } from '../../config/axios.global';

export interface DataOrderByProductProps {
  id: number;
  client: string;
  dateDelivery: string;
  quantity: string;
  weight: string;
  obs?: string;
}

export async function getOrderByProduct(
  product: string,
  productWeight: string,
  productDate: string
) {
  const data: DataOrderByProductProps[] = await (
    await api.get(
      `orders-products/list/orderbyproduct?description=${product}&weight=${productWeight}&dateDelivery=${productDate}`
    )
  ).data;

  return data;
}
