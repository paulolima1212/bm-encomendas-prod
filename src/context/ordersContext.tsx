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
  handlerSetObsOrder: (value: string) => void;
  isModalActive: boolean;
  isModalOrdersActive: boolean;
  items: NewOrderProps;
  obsProduct: string;
  obsOrder: string;
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
  obs?: string;
}

export const ordersContext = createContext({} as OrderContextProps);

export function OrderContextProvider({ children }: { children: ReactNode }) {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalOrdersActive, setIsModalOrdersActive] = useState(false);
  const [items, setItems] = useState({} as NewOrderProps);
  const [obsProduct, setObsProduct] = useState('');
  const [obsOrder, setObsOrder] = useState('');

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
    console.log(obs);
    setObsProduct(obs);
  }

  function handlerSetObsOrder(obs: string) {
    setObsOrder(obs);
  }

  return (
    <ordersContext.Provider
      value={{
        handleSetStatusModal,
        handleSetStatusModalOrder,
        handleSendMessage,
        handlerSetObsProduct,
        handlerSetObsOrder,
        isModalActive,
        items,
        isModalOrdersActive,
        obsProduct,
        obsOrder,
      }}
    >
      {children}
    </ordersContext.Provider>
  );
}
