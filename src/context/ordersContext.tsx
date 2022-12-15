import { createContext, ReactNode, useState } from 'react';
import { NewOrderProps } from '../Pages/EditOrders';
import { NewProdcutProps } from '../Pages/Home';
import { getOrderById } from '../services/Http/getOrderById';

interface OrderContextProps {
  handleSetStatusModal: (item?: any) => void;
  isModalActive: boolean;
  items: NewOrderProps;
}

interface DataEncomenda {
  id: number;
  client: string;
  contact: string;
  createdAt: string;
  dateDelivery: string;
  statusOrder: string;
  totalOrder: string;
  orders_products: NewProdcutProps[];
}

export const ordersContext = createContext({} as OrderContextProps);

export function OrderContextProvider({ children }: { children: ReactNode }) {
  const [isModalActive, setIsModalActive] = useState(false);
  const [items, setItems] = useState({} as NewOrderProps);

  async function handleSetStatusModal(item: DataEncomenda) {
    setIsModalActive((prev) => !prev);
    const orderAndProducts = await getOrderById(String(item.id));
    setItems(orderAndProducts);
  }

  return (
    <ordersContext.Provider
      value={{ handleSetStatusModal, isModalActive, items }}
    >
      {children}
    </ordersContext.Provider>
  );
}
