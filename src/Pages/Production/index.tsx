import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Header } from '../../components/Header';
import { useOrdersContext } from '../../hooks/useOrdersContext';
import { getListProducts } from '../../services/Http/getListProducts';
import {
  DataOrderByProductProps,
  getOrderByProduct,
} from '../../services/Http/getOrdersByProduct';
import { ModalOrdersByProducts } from './components/Modal/modal';
import {
  MainContainer,
  ProductionContainer,
  TableContainer,
  WaperFields,
} from './production.styles';

export interface ListProducts {
  id?: string;
  description: string;
  weight: string;
  'sum(op.quantity)': string;
  'left(o.dateDelivery, 10)': string;
}

interface ModalProps {
  data: DataOrderByProductProps[];
  product: string;
}

export function Production() {
  const { handleSetStatusModalOrder, isModalOrdersActive } = useOrdersContext();

  const description = useRef<HTMLInputElement>(null);
  const weight = useRef<HTMLInputElement>(null);
  const quantity = useRef<HTMLInputElement>(null);
  const dateDelivery = useRef<HTMLInputElement>(null);

  const [listProducts, setListProducts] = useState<ListProducts[]>([]);
  const [filter, setFilter] = useState('');
  const [dataOrder, setDataOrder] = useState<ModalProps>({} as ModalProps);

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

  async function handleListItem(e: React.MouseEvent<HTMLTableCellElement>) {
    const productWeight = e.currentTarget.nextElementSibling!.innerHTML;
    const productFieldPeso = e.currentTarget.nextElementSibling;
    const productFieldQuantity = productFieldPeso!.nextSibling;
    const productDateField = productFieldQuantity!.nextSibling;
    const product = e.currentTarget.innerText.toLowerCase().replace(' ', '%20');
    const productText = e.currentTarget.innerHTML;
    const productDate = productDateField?.textContent;

    const data = await getOrderByProduct(
      product,
      productWeight,
      String(productDate)
    );

    setDataOrder({
      data,
      product: productText,
    });

    handleSetStatusModalOrder();
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
        product['sum(op.quantity)'].toString().match(quantity.current!.value) &&
        product['left(o.dateDelivery, 10)'].includes(
          dateDelivery.current!.value
        )
      ) {
        return (
          <tr key={product.id}>
            <td className='productDescription' onClick={handleListItem}>
              {product.description}
            </td>
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
      {isModalOrdersActive && (
        <ModalOrdersByProducts
          data={dataOrder.data}
          product={dataOrder.product}
        />
      )}
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
