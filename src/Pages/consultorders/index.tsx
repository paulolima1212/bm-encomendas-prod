import { PencilSimpleLine, SignOut, Trash } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { NewOrderProps } from '../Home';
import {
  ButtonContainer,
  StatusContainer,
  WaperContainer,
  WaperFields,
  WarperTableContainer,
} from './consultorders.styles';

export function ConsultOrders() {
  const [orders, setOrders] = useState<NewOrderProps[]>([]);

  useEffect(() => {
    const ordersJSON = localStorage.getItem('@bolachamaria:encomendas');

    if (ordersJSON!.length > 0) {
      setOrders(JSON.parse(ordersJSON!));
    }
  }, []);

  return (
    <WaperContainer>
      <Header title='Consulta Encomendas' />
      <WarperTableContainer>
        <table>
          <thead>
            <tr>
              <th>
                <WaperFields>
                  <span>Encomenda</span>
                  <input type='text' className='filterField active' />
                </WaperFields>
              </th>
              <th>
                <WaperFields>
                  <span>Cliente</span>
                  <input type='text' className='filterField' />
                </WaperFields>
              </th>
              <th>
                <WaperFields>
                  <span>Tlm/Tlf</span>
                  <input type='text' className='filterField' />
                </WaperFields>
              </th>
              <th>
                <WaperFields>
                  <span>Recolha</span>
                  <input type='text' className='filterField' />
                </WaperFields>
              </th>
              <th>
                <WaperFields>
                  <span>Status</span>
                  <input type='text' className='filterField' />
                </WaperFields>
              </th>
              <th>
                <span>Tarefas</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => {
              return (
                <tr key={item.id}>
                  <td>Nº {item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.dateTime}</td>
                  <td>
                    <StatusContainer statusColor={item.statusOrder}>
                      {item.statusOrder}
                    </StatusContainer>
                  </td>
                  <td>
                    <ButtonContainer>
                      <button>
                        <SignOut size={20} />
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
            })}
          </tbody>
        </table>
      </WarperTableContainer>
    </WaperContainer>
  );
}
