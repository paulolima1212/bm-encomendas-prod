import { OrderContextProvider } from '../../context/ordersContext';
import { ListOrders } from './ListOrders';

export function ConsultOrders() {
  return (
    <OrderContextProvider>
      <ListOrders />
    </OrderContextProvider>
  );
}
