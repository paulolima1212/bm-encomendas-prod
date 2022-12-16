import { Routes, Route } from 'react-router-dom';
import { OrderContextProvider } from './context/ordersContext';
import { ConsultOrders } from './Pages/consultorders';
import { EditOrder } from './Pages/EditOrders';
import { NewOrder } from './Pages/Home';
import { Production } from './Pages/Production';

export function Router() {
  return (
    <OrderContextProvider>
      <Routes>
        <Route path='/' element={<NewOrder />} />
        <Route path='/resumoencomendas' element={<ConsultOrders />} />
        <Route path='/editorder/:id' element={<EditOrder />} />
        <Route path='/listaproducao' element={<Production />} />
      </Routes>
    </OrderContextProvider>
  );
}
