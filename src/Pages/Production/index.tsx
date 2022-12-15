import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { getListProducts } from '../../services/Http/getListProducts';
import {
  MainContainer,
  ProductionContainer,
  TableContainer,
} from './production.styles';

export interface ListProducts {
  description: string;
  weight: string;
  'sum(op.quantity)': string;
  'left(o.dateDelivery, 10)': string;
}

export function Production() {
  const [listProducts, setListProducts] = useState<ListProducts[]>([]);

  async function handlerGetListProducts() {
    const newListProduct: ListProducts[] = await getListProducts();

    setListProducts(newListProduct);
  }

  useEffect(() => {
    handlerGetListProducts();
  }, []);

  return (
    <ProductionContainer>
      <Header title='Lista Produtos' />
      <MainContainer>
        <h2>Production</h2>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Descição</th>
                <th>Peso</th>
                <th>Quantidade</th>
                <th>Data Entrega</th>
              </tr>
            </thead>
            <tbody>
              {listProducts.map((product) => {
                return (
                  <tr key={product['left(o.dateDelivery, 10)']}>
                    <td>{product.description}</td>
                    <td>{product.weight}</td>
                    <td>{product['sum(op.quantity)']}</td>
                    <td>{product['left(o.dateDelivery, 10)']}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
      </MainContainer>
    </ProductionContainer>
  );
}
