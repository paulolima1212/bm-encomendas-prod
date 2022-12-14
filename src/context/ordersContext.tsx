import { createContext, ReactNode, useState } from 'react';

interface OrderContextProps {
  handleSetStatusModal: () => void;
  isModalActive: boolean;
}

export const ordersContext = createContext({} as OrderContextProps);

export function OrderContextProvider({ children }: { children: ReactNode }) {
  const [isModalActive, setIsModalActive] = useState(false);

  function handleSetStatusModal() {
    setIsModalActive((prev) => !prev);
  }

  return (
    <ordersContext.Provider value={{ handleSetStatusModal, isModalActive }}>
      {children}
    </ordersContext.Provider>
  );
}
