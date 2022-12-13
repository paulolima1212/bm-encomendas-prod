import { Routes, Route } from 'react-router-dom';
import { NewOrder } from './Pages/Home';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<NewOrder />} />
    </Routes>
  );
}
