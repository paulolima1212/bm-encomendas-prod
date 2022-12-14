import { Routes, Route } from 'react-router-dom';
import { ConsultOrders } from './Pages/consultorders';
import { EditOrder } from './Pages/EditOrders';
import { NewOrder } from './Pages/Home';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<NewOrder />} />
      <Route path='/resumoencomendas' element={<ConsultOrders />} />
      <Route path='/editorder' element={<EditOrder />} />
    </Routes>
  );
}
