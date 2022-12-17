import { PencilSimpleLine, Scroll, SignOut, Trash } from 'phosphor-react';
import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../../components/Header';
import { useOrdersContext } from '../../../hooks/useOrdersContext';
import { deleteOrderById } from '../../../services/Http/deleteOrder';
import { getAllOrder } from '../../../services/Http/getAllOrders';
import { NewOrderProps } from '../../Home';
import { ModalListOrders } from '../components/Modal/modal';
import {
  ButtonContainer,
  ResumeOrderContainer,
  StatusContainer,
  StatusOrderContainer,
  WaperContainer,
  WaperFields,
  WarperTableContainer,
} from './consultorders.styles';
import { dateFormatter, priceFormatter } from '../../../utils/formatter';

export function ListOrders() {
  const { isModalActive, handleSetStatusModal } = useOrdersContext();

  const numOrder = useRef<HTMLInputElement>(null);
  const client = useRef<HTMLInputElement>(null);
  const contact = useRef<HTMLInputElement>(null);
  const dateDelivery = useRef<HTMLInputElement>(null);
  const statusOrder = useRef<HTMLInputElement>(null);

  const [orders, setOrders] = useState<NewOrderProps[]>([]);
  const [filter, setFilter] = useState('');

  const navigate = useNavigate();

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
    activeInput.focus();
  }

  function handleDeleteOrder(id: number) {
    deleteOrderById(id);
    return navigate('/');
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
        item.dateDelivery.includes(dateDelivery.current!.value) &&
        item.statusOrder.includes(statusOrder.current!.value)
      ) {
        return (
          <tr key={item.id}>
            <td>Nº {item.id}</td>
            <td>{item.client}</td>
            <td>{item.contact}</td>
            <td>{dateFormatter.format(new Date(item.dateDelivery))}</td>
            <td>{priceFormatter.format(Number(item.totalOrder))}</td>
            <td>
              <StatusContainer statusColor={item.statusOrder}>
                {item.statusOrder}
              </StatusContainer>
            </td>
            <td>
              <ButtonContainer>
                <button>
                  <Scroll
                    size={20}
                    onClick={() => handleSetStatusModal(item)}
                  />
                </button>
                <button>
                  <Link to={`/editorder/${item.id}`}>
                    <PencilSimpleLine size={20} />
                  </Link>
                </button>
                <button onClick={() => handleDeleteOrder(item.id)}>
                  <Trash size={20} />
                </button>
              </ButtonContainer>
            </td>
          </tr>
        );
      }
    });
  }

  const totalOrders = orders.reduce(
    (acc, order) => {
      acc.total += Number(order.totalOrder);

      if (order.statusOrder === 'cancelada') {
        acc.cancelada += 1;
      }

      if (order.statusOrder === 'entregue') {
        acc.entregue += 1;
      }

      if (order.statusOrder === 'pendente') {
        acc.pendente += 1;
      }
      return acc;
    },
    {
      total: 0,
      entregue: 0,
      pendente: 0,
      cancelada: 0,
    }
  );

  return (
    <WaperContainer>
      {isModalActive && <ModalListOrders />}
      <Header title='Consulta Encomendas' />
      <WarperTableContainer>
        <ResumeOrderContainer>
          <StatusOrderContainer>
            <div>
              <StatusContainer statusColor='entregue'>
                Entregue -{' '}
              </StatusContainer>
              <span>{totalOrders.entregue}</span>
            </div>
            <div>
              <StatusContainer statusColor='pendente'>
                Pendente -{' '}
              </StatusContainer>
              <span>{totalOrders.pendente}</span>
            </div>
            <div>
              <StatusContainer statusColor='cancelada'>
                Cancelada -{' '}
              </StatusContainer>
              <span>{totalOrders.cancelada}</span>
            </div>
          </StatusOrderContainer>
          <div>
            <span>Total:</span>
            <span>{priceFormatter.format(totalOrders.total)}</span>
          </div>
        </ResumeOrderContainer>
        <div>
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
                <th id='recolha'>
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
                    <span onClick={handleActiveFilter}>Total</span>
                    <input
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
        </div>
      </WarperTableContainer>
    </WaperContainer>
  );
}
