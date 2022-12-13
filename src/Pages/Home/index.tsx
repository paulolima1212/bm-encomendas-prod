import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header } from '../../components/Header';
import { zodResolver } from '@hookform/resolvers/zod';

import cuid from 'cuid';
import * as z from 'zod';

import {
  ButtonCartEncomenda,
  ButtonContainer,
  ButtonCriarEncomendaContainer,
  FieldsContainer,
  FieldsItemContainer,
  InputContainer,
  InputContainerBigger,
  InputContainerDefault,
  InputContainerSmall,
  InputIDContainer,
  InputQuantityContainer,
  TableContainer,
  WaperContainer,
  WarperTableContainer,
} from './newencomendas.styles';

import {
  PlusCircle,
  MinusCircle,
  ShoppingCart,
  Trash,
  PencilLine,
  FloppyDisk,
} from 'phosphor-react';

interface NewProdcutProps {
  id: string;
  product: string;
  pesoProduct: string;
  quantity: number;
  price: string;
}

export interface NewOrderProps {
  id: number;
  name: string;
  phone: string;
  dateTime: string;
  products: NewProdcutProps[];
  statusOrder: 'pendente' | 'cancelada' | 'entregue';
}

export function NewOrder() {
  const newOrderSchema = z.object({
    name: z.string(),
    phone: z.string(),
    dateTime: z.string(),
    status: z.enum(['pendente', 'cancelada', 'entregue']),
  });

  type NewOrderInputs = z.infer<typeof newOrderSchema>;

  const [quantity, setQuantity] = useState(0);
  const [order, setOrder] = useState<NewProdcutProps[]>([]);
  const [idActiveOrder, setIdActiveOrder] = useState(0);
  const [newOrder, setNewOrder] = useState<NewOrderProps | null>(null);

  const descPrincipal = useRef<HTMLInputElement>(null);
  const descVariant = useRef<HTMLInputElement>(null);
  const peso = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset } = useForm<NewOrderInputs>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: {
      status: 'pendente',
    },
  });

  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecreaseQuantity() {
    if (quantity >= 1) {
      setQuantity((prev) => prev - 1);
    }
  }

  function handleCreateNewOrder(data: NewOrderInputs) {
    const activeOrder: NewOrderProps = {
      id: idActiveOrder,
      name: data.name,
      phone: data.phone,
      dateTime: data.dateTime,
      products: order,
      statusOrder: data.status,
    };

    setNewOrder(activeOrder);
    setIdActiveOrder(0);
    setOrder([]);
    reset();
    descPrincipal.current!.value = '';
    descVariant.current!.value = '';
    peso.current!.value = '';
    price.current!.value = '';
    setQuantity(0);
  }

  function handleChangeQuantity() {
    const quantity = document.getElementById('quantity') as HTMLInputElement;
    setQuantity(Number(quantity.value));
  }

  function handleAddProductInCart() {
    const descriptionProduct =
      descPrincipal.current!.value + ' - ' + descVariant.current!.value;
    const weightProduct = peso.current!.value;
    const priceProduct = price.current!.value;

    if (
      descriptionProduct !== '' &&
      weightProduct !== '' &&
      priceProduct !== '' &&
      quantity !== 0
    ) {
      const newItem: NewProdcutProps = {
        id: cuid(),
        pesoProduct: weightProduct,
        price: priceProduct,
        product: descriptionProduct,
        quantity,
      };

      setOrder((prev) => [...prev, newItem]);

      descPrincipal.current!.value = '';
      descVariant.current!.value = '';
      peso.current!.value = '';
      price.current!.value = '';
      setQuantity(0);
    }
  }

  function handleDeleteItem(id: string) {
    const newList = order.filter((item) => item.id !== id);

    setOrder(newList);
  }

  function handleEditItem(id: string) {
    const newList = order.filter((item) => item.id !== id);
    order.filter((item) => {
      if (item.id === id) {
        descPrincipal.current!.value = item.product.split('-')[0];
        descVariant.current!.value = item.product.split('-')[1];
        peso.current!.value = item.pesoProduct;
        price.current!.value = item.price;
        setQuantity(item.quantity);
      }
      return null;
    });

    setOrder(newList);
  }

  const isButtonSaveOrderActive = order.length === 0;

  useEffect(() => {
    const orderJSON = localStorage.getItem('@bolachamaria:encomendas');

    if (!orderJSON) {
      localStorage.setItem('@bolachamaria:encomendas', JSON.stringify([]));
    } else if (newOrder) {
      const newListOrders = JSON.parse(orderJSON);
      newListOrders.push(newOrder);
      localStorage.setItem(
        '@bolachamaria:encomendas',
        JSON.stringify(newListOrders),
      );
    }
  }, [newOrder]);

  return (
    <WaperContainer>
      <Header title="Bolacha Maria - Registo Encomendas" />
      <form id="orderForm" onSubmit={handleSubmit(handleCreateNewOrder)}>
        <FieldsContainer>
          <h3>Dados encomenda</h3>
          <div>
            <label htmlFor="num_encomenda">
              <span>Nº Encomenda</span>
              <InputIDContainer
                value={idActiveOrder}
                readOnly
                id="num_encomenda"
              />
            </label>
            <label htmlFor="nome_cliente">
              <span>Nome cliente</span>
              <InputContainer
                type="text"
                variant="15rem"
                id="nome_cliente"
                {...register('name')}
              />
            </label>
            <label htmlFor="telemovel">
              <span>Telemovel</span>
              <InputContainer
                type="number"
                id="telemovel"
                variant="15rem"
                {...register('phone')}
              />
            </label>
            <label htmlFor="data_entrega">
              <span>Data/Hora</span>
              <InputContainer
                type="datetime-local"
                id="data_entrega"
                variant="20rem"
                {...register('dateTime')}
              />
            </label>

            <datalist id="status-order">
              <option value="pendente" />
              <option value="entregue" />
              <option value="cancelada" />
            </datalist>

            <label htmlFor="status">
              <span>Status</span>
              <InputContainer
                type="text"
                id="status"
                variant="15rem"
                list="status-order"
                {...register('status')}
              />
            </label>
          </div>
        </FieldsContainer>
      </form>
      <WarperTableContainer>
        <datalist id="products">
          <option value="Chocolate" />
          <option value="Tradicional" />
          <option value="Chocolate branco" />
        </datalist>
        <datalist id="peso">
          <option value="1.5kg" />
          <option value="1kg" />
          <option value="500g" />
        </datalist>
        <datalist id="description">
          <option value="Bolo rei" />
          <option value="Pão de ló" />
          <option value="Rabanada" />
        </datalist>
        <datalist id="variant">
          <option value="Chocolate" />
          <option value="tradicional" />
          <option value="nutella" />
        </datalist>
        <datalist id="price">
          <option value="19.99€" />
          <option value="18.99€" />
          <option value="17.99€" />
        </datalist>

        <FieldsItemContainer>
          <ButtonCriarEncomendaContainer
            disabled={!!isButtonSaveOrderActive}
            form="orderForm"
            type="submit"
          >
            <FloppyDisk size={25} /> Salvar encomenda
          </ButtonCriarEncomendaContainer>
          <h3>Novo item</h3>
          <div>
            <InputContainerDefault
              ref={descPrincipal}
              type="text"
              list="description"
            />
            <InputContainerBigger
              ref={descVariant}
              type="text"
              list="variant"
            />
            <InputContainerSmall ref={peso} type="text" list="peso" />
            <InputContainerSmall ref={price} type="text" list="price" />

            <div className="buttons">
              <button onClick={handleDecreaseQuantity}>
                <MinusCircle size={25} />
              </button>
              <span>
                <InputQuantityContainer
                  placeholder="0"
                  onChange={handleChangeQuantity}
                  value={quantity}
                  id="quantity"
                  min={0}
                />
              </span>
              <button onClick={handleIncreaseQuantity}>
                <PlusCircle size={25} />
              </button>
            </div>

            <ButtonContainer>
              <ButtonCartEncomenda onClick={handleAddProductInCart}>
                <ShoppingCart size={25} />
              </ButtonCartEncomenda>
            </ButtonContainer>
          </div>
        </FieldsItemContainer>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Peso</th>
                <th>Valor</th>
                <th>Quantidade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {order.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.product}</td>
                    <td>{item.pesoProduct}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <ButtonContainer>
                        <ButtonCartEncomenda
                          onClick={() => handleEditItem(item.id)}
                        >
                          <PencilLine size={25} />
                        </ButtonCartEncomenda>
                        <ButtonCartEncomenda
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash size={25} />
                        </ButtonCartEncomenda>
                      </ButtonContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
      </WarperTableContainer>
    </WaperContainer>
  );
}
