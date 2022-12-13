import { Routes, Route } from 'react-router-dom';
import { ConsultOrders } from './Pages/consultorders';
import { NewOrder } from './Pages/Home';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<NewOrder />} />
      <Route path='/resumoencomendas' element={<ConsultOrders />} />
    </Routes>
  );
}
