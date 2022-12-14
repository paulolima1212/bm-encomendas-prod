import { useContext } from 'react';
import { ordersContext } from '../context/ordersContext';

export const useOrdersContext = () => {
  return useContext(ordersContext);
};
