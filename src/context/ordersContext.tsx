import { createContext, ReactNode, useState } from 'react';
import { NewOrderProps } from '../Pages/EditOrders';
import { NewProdcutProps } from '../Pages/Home';
import { getOrderById } from '../services/Http/getOrderById';
import { sendMessage } from '../services/Http/sendMessage';

interface OrderContextProps {
  handleSetStatusModal: (item?: any) => void;
  handleSetStatusModalOrder: () => void;
  handleSendMessage: () => void;
  handlerSetObsProduct: (value: string) => void;
  isModalActive: boolean;
  isModalOrdersActive: boolean;
  items: NewOrderProps;
  obsProduct: string;
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
  const [isModalOrdersActive, setIsModalOrdersActive] = useState(false);
  const [items, setItems] = useState({} as NewOrderProps);
  const [obsProduct, setObsProduct] = useState('');

  async function handleSetStatusModal(item: DataEncomenda) {
    try {
      const orderAndProducts = await getOrderById(String(item.id));
      setItems(orderAndProducts);
      setIsModalActive((prev) => !prev);
    } catch (error) {
      setIsModalActive((prev) => !prev);
    }
  }

  async function handleSetStatusModalOrder() {
    setIsModalOrdersActive((prev) => !prev);
  }

  async function handleSendMessage() {
    sendMessage(items);
    setIsModalActive((prev) => !prev);
  }

  function handlerSetObsProduct(obs: string) {
    setObsProduct(obs);
  }

  return (
    <ordersContext.Provider
      value={{
        handleSetStatusModal,
        handleSetStatusModalOrder,
        handleSendMessage,
        handlerSetObsProduct,
        isModalActive,
        items,
        isModalOrdersActive,
        obsProduct,
      }}
    >
      {children}
    </ordersContext.Provider>
  );
}
