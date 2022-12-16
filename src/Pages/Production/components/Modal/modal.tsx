import { X } from 'phosphor-react';
import { useOrdersContext } from '../../../../hooks/useOrdersContext';
import { DataOrderByProductProps } from '../../../../services/Http/getOrdersByProduct';

import {
  MainModalContainer,
  ModalContainer,
  TableContainer,
} from './modal.styles';
import { dateFormatter } from '../../../../utils/formatter';

export function ModalOrdersByProducts({
  data,
  product,
}: {
  data: DataOrderByProductProps[];
  product: string;
}) {
  const { handleSetStatusModalOrder } = useOrdersContext();

  return (
    <ModalContainer>
      <MainModalContainer>
        <div>
          <h2>{product}</h2>
          <X size={30} onClick={handleSetStatusModalOrder} />
        </div>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Data Entrega</th>
                <th>Nº En.</th>
                <th>Quantidade</th>
                <th>Peso</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.client}</td>
                    <td>{dateFormatter.format(new Date(item.dateDelivery))}</td>
                    <td>{item.id}</td>
                    <td>{item.quantity}</td>
                    <td>{item.weight}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
      </MainModalContainer>
    </ModalContainer>
  );
}
