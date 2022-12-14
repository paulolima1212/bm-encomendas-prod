import { PencilSimpleLine, Scroll, SignOut, Trash } from 'phosphor-react';
import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Header } from '../../components/Header';
import { getAllOrder } from '../../services/Http/getAllOrders';
import { NewOrderProps } from '../Home';
import {
  ButtonContainer,
  StatusContainer,
  WaperContainer,
  WaperFields,
  WarperTableContainer,
} from './consultorders.styles';

export function ConsultOrders() {
  const numOrder = useRef<HTMLInputElement>(null);
  const client = useRef<HTMLInputElement>(null);
  const contact = useRef<HTMLInputElement>(null);
  const dateDelivery = useRef<HTMLInputElement>(null);
  const statusOrder = useRef<HTMLInputElement>(null);

  const [orders, setOrders] = useState<NewOrderProps[]>([]);
  const [filter, setFilter] = useState('');

  async function getOrders() {
    const data = await getAllOrder();
    setOrders(data);
  }

  function handleSetFilter(e: ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  function handleActiveFilter(
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    const activeInput = e.currentTarget.nextSibling as HTMLInputElement;

    activeInput.classList.toggle('active');
  }

  useEffect(() => {
    getOrders();
  }, [filter]);

  function renderDataTable() {
    return orders.map((item) => {
      if (
        item.id.toString().includes(String(numOrder.current!.value)) &&
        item.client
          .toLowerCase()
          .includes(client.current!.value.toLowerCase()) &&
        item.contact.toString().includes(String(contact.current!.value)) &&
        item.dateDelivery.includes(String(dateDelivery.current!.value)) &&
        item.statusOrder.includes(statusOrder.current!.value)
      ) {
        return (
          <tr key={item.id}>
            <td>Nº {item.id}</td>
            <td>{item.client}</td>
            <td>{item.contact}</td>
            <td>{item.dateDelivery}</td>
            <td>
              <StatusContainer statusColor={item.statusOrder}>
                {item.statusOrder}
              </StatusContainer>
            </td>
            <td>
              <ButtonContainer>
                <button>
                  <Scroll size={20} />
                </button>
                <button>
                  <PencilSimpleLine size={20} />
                </button>
                <button>
                  <Trash size={20} />
                </button>
              </ButtonContainer>
            </td>
          </tr>
        );
      }
    });
  }

  return (
    <WaperContainer>
      <Header title='Consulta Encomendas' />
      <WarperTableContainer>
        <table>
          <thead>
            <tr>
              <th>
                <WaperFields>
                  <span onClick={handleActiveFilter}>Encomenda</span>
                  <input
                    ref={numOrder}
                    type='text'
                    className='filterField'
                    onChange={handleSetFilter}
                  />
                </WaperFields>
              </th>
              <th>
                <WaperFields>
                  <span onClick={handleActiveFilter}>Cliente</span>
                  <input
                    ref={client}
                    type='text'
                    className='filterField'
                    onChange={handleSetFilter}
                  />
                </WaperFields>
              </th>
              <th>
                <WaperFields>
                  <span onClick={handleActiveFilter}>Tlm/Tlf</span>
                  <input
                    ref={contact}
                    type='text'
                    className='filterField'
                    onChange={handleSetFilter}
                  />
                </WaperFields>
              </th>
              <th>
                <WaperFields>
                  <span onClick={handleActiveFilter}>Recolha</span>
                  <input
                    ref={dateDelivery}
                    type='text'
                    className='filterField'
                    onChange={handleSetFilter}
                  />
                </WaperFields>
              </th>
              <th>
                <WaperFields>
                  <span onClick={handleActiveFilter}>Status</span>
                  <input
                    ref={statusOrder}
                    type='text'
                    className='filterField'
                    onChange={handleSetFilter}
                  />
                </WaperFields>
              </th>
              <th>
                <span>Tarefas</span>
              </th>
            </tr>
          </thead>
          <tbody>{renderDataTable()}</tbody>
        </table>
      </WarperTableContainer>
    </WaperContainer>
  );
}
