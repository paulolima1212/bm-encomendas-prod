import { useEffect, useState } from 'react';
import { useOrdersContext } from '../../../../hooks/useOrdersContext';
import { getOrderById } from '../../../../services/Http/getOrderById';
import { NewOrderProps } from '../../../EditOrders';
import {
  ButtonContainer,
  MainModalContainer,
  ModalContainer,
  TableContainer,
  UlContainer,
} from './modal.styles';

export function ModalListOrders() {
  const { handleSetStatusModal, items } = useOrdersContext();

  return (
    <ModalContainer onClick={() => handleSetStatusModal(items.id)}>
      <MainModalContainer>
        <h2>Enviar pedido</h2>
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
            <span>{items.dateDelivery}</span>
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
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
        <ButtonContainer>
          <strong>Enviar</strong>
        </ButtonContainer>
      </MainModalContainer>
    </ModalContainer>
  );
}
