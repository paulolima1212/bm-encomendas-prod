import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Header } from '../../components/Header';
import { getListProducts } from '../../services/Http/getListProducts';
import {
  MainContainer,
  ProductionContainer,
  TableContainer,
  WaperFields,
} from './production.styles';

export interface ListProducts {
  id: string;
  description: string;
  weight: string;
  'sum(op.quantity)': string;
  'left(o.dateDelivery, 10)': string;
}

export function Production() {
  const description = useRef<HTMLInputElement>(null);
  const weight = useRef<HTMLInputElement>(null);
  const quantity = useRef<HTMLInputElement>(null);
  const dateDelivery = useRef<HTMLInputElement>(null);

  const [listProducts, setListProducts] = useState<ListProducts[]>([]);
  const [filter, setFilter] = useState('');

  async function handlerGetListProducts() {
    const newListProduct: ListProducts[] = await getListProducts();

    setListProducts(newListProduct);
  }

  useEffect(() => {
    handlerGetListProducts();
  }, [filter]);

  function handleSetFilter(e: React.MouseEvent<HTMLSpanElement>) {
    const field = e.currentTarget.nextSibling as HTMLInputElement;

    field.classList.toggle('active');
    field.focus();
  }

  function renderTableInfo() {
    return listProducts.map((product) => {
      if (
        product.description
          .toLowerCase()
          .includes(description.current!.value.toLowerCase()) &&
        product.weight
          .toLowerCase()
          .includes(weight.current!.value.toLowerCase()) &&
        product['sum(op.quantity)']
          .toString()
          .includes(weight.current!.value) &&
        product['left(o.dateDelivery, 10)'].includes(
          dateDelivery.current!.value
        )
      ) {
        return (
          <tr key={product.id}>
            <td>{product.description}</td>
            <td>{product.weight}</td>
            <td>{product['sum(op.quantity)']}</td>
            <td>{product['left(o.dateDelivery, 10)']}</td>
          </tr>
        );
      }
    });
  }

  function handleSetFilterState(e: ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  return (
    <ProductionContainer>
      <Header title='Lista Produtos' />
      <MainContainer>
        <h2>Production</h2>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>
                  <WaperFields>
                    <span onClick={handleSetFilter}>Descição</span>
                    <input
                      type='text'
                      ref={description}
                      onChange={handleSetFilterState}
                    />
                  </WaperFields>
                </th>
                <th>
                  <WaperFields>
                    <span onClick={handleSetFilter}>Peso</span>
                    <input
                      type='text'
                      ref={weight}
                      onChange={handleSetFilterState}
                    />
                  </WaperFields>
                </th>
                <th>
                  <WaperFields>
                    <span onClick={handleSetFilter}>Quantidade</span>
                    <input
                      type='text'
                      ref={quantity}
                      onChange={handleSetFilterState}
                    />
                  </WaperFields>
                </th>
                <th>
                  <WaperFields>
                    <span onClick={handleSetFilter}>Data Entrega</span>
                    <input
                      type='text'
                      ref={dateDelivery}
                      onChange={handleSetFilterState}
                    />
                  </WaperFields>
                </th>
              </tr>
            </thead>
            <tbody>{renderTableInfo()}</tbody>
          </table>
        </TableContainer>
      </MainContainer>
    </ProductionContainer>
  );
}
