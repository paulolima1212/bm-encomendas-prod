import { X } from 'phosphor-react';
import { useOrdersContext } from '../../../../hooks/useOrdersContext';
import { dateFormatter, priceFormatter } from '../../../../utils/formatter';
import {
  ButtonContainer,
  MainModalContainer,
  ModalContainer,
  TableContainer,
  UlContainer,
} from './modal.styles';

export function ModalListOrders() {
  const { handleSetStatusModal, handleSendMessage, items } = useOrdersContext();

  return (
    <ModalContainer>
      <MainModalContainer>
        <h2>
          <strong>Enviar pedido</strong>
          <span onClick={() => handleSetStatusModal(items.id)}>
            <X />
          </span>
        </h2>
        <UlContainer>
          <li>
            <span>
              <strong>Nº Enc</strong>
            </span>
            <span>{items.id}</span>
          </li>
          <li>
            <span>
              <strong>Cliente</strong>
            </span>
            <span>{items.client}</span>
          </li>
          <li>
            <span>
              <strong>Contato</strong>
            </span>
            <span>{items.contact}</span>
          </li>
          <li>
            <span>
              <strong>Data Entrega</strong>
            </span>
            <span>{dateFormatter.format(new Date(items.dateDelivery))}</span>
          </li>
        </UlContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Peso</th>
                <th>Preço</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {items.products.map((product) => {
                return (
                  <tr>
                    <td>{product.description}</td>
                    <td>{product.weight}</td>
                    <td>{priceFormatter.format(Number(product.price))}</td>
                    <td>{product.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
        <ButtonContainer onClick={() => handleSendMessage()}>
          <strong>Enviar</strong>
        </ButtonContainer>
      </MainModalContainer>
    </ModalContainer>
  );
}
