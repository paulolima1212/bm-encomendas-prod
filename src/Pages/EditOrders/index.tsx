import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header } from '../../components/Header';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';

import cuid from 'cuid';
import * as z from 'zod';

import {
  ButtonCartEncomenda,
  ButtonContainer,
  ButtonCriarEncomendaContainer,
  ButtonInfoEncomenda,
  DialogRoot,
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
  Info,
} from 'phosphor-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById } from '../../services/Http/getOrderById';
import { updateOrderById } from '../../services/Http/updateOrder';
import { priceFormatter } from '../../utils/formatter';
import { getAllProducts } from '../../services/Http/getAllProducts';
import { getAllProductsVariant } from '../../services/Http/getProductsVariant';
import { ListProductsProps, ProductsVariantProps } from '../Home';
import { ObsOrderModal } from './components/ObsOrderModal';
import { ObsModal } from './components/ObsModal';
import { useOrdersContext } from '../../hooks/useOrdersContext';

interface NewProdcutProps {
  id: string;
  description: string;
  weight: string;
  quantity: number;
  price: string;
  obs?: string;
}

export interface NewOrderProps {
  id: number;
  client: string;
  contact: string;
  dateDelivery: string;
  products: NewProdcutProps[];
  statusOrder: string;
  totalOrder?: number;
  obs?: string;
}

interface DataClientProps {
  id: number;
  name: string;
  contact: string;
  date: string;
  status: string;
}

export function EditOrder() {
  const { obsProduct, handlerSetObsProduct, obsOrder, handlerSetObsOrder } =
    useOrdersContext();

  const idOrder = useParams();

  const navigate = useNavigate();

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
  const [dataClient, setDataClient] = useState({} as DataClientProps);
  const [listProducts, setListProducts] = useState<ListProductsProps[]>([]);
  const [listVariantProducts, setListVariantProducts] = useState<
    ProductsVariantProps[]
  >([]);

  const descPrincipal = useRef<HTMLInputElement>(null);
  const descVariant = useRef<HTMLInputElement>(null);
  const peso = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset } = useForm<NewOrderInputs>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: {
      name: dataClient.name,
      phone: dataClient.contact,
      dateTime: dataClient.date,
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

  function handleChangeNameClient(e: ChangeEvent<HTMLInputElement>) {
    setDataClient((prev) => ({ ...prev, name: e.target.value }));
  }
  function handleChangeContactClient(e: ChangeEvent<HTMLInputElement>) {
    setDataClient((prev) => ({ ...prev, contact: e.target.value }));
  }
  function handleChangeDateClient(e: ChangeEvent<HTMLInputElement>) {
    setDataClient((prev) => ({ ...prev, date: e.target.value }));
  }
  function handleChangeStatusClient(e: ChangeEvent<HTMLInputElement>) {
    setDataClient((prev) => ({ ...prev, status: e.target.value }));
  }

  async function handleSetActiveOrder() {
    const orderToEdit = await getOrderById(String(idOrder.id));
    setNewOrder(orderToEdit);
    //@ts-ignore
    setOrder(orderToEdit.products);
    const newClient: DataClientProps = {
      id: orderToEdit.id,
      name: orderToEdit.client,
      contact: orderToEdit.contact,
      date: orderToEdit.dateDelivery,
      status: orderToEdit.statusOrder,
    };

    setDataClient(newClient);
  }

  async function handleUpdateOrder(e: any) {
    const totalOrder = order.reduce((acc, item) => {
      acc += Number(item.price);
      return acc;
    }, 0);
    const activeOrder: NewOrderProps = {
      id: dataClient.id,
      client: dataClient.name,
      contact: dataClient.contact,
      dateDelivery: dataClient.date,
      products: order,
      statusOrder: dataClient.status,
      totalOrder,
      obs: obsOrder,
    };

    updateOrderById(String(dataClient.id), activeOrder);

    handlerSetObsOrder('');

    return navigate('/');
  }

  function handleChangeQuantity() {
    const quantity = document.getElementById('quantity') as HTMLInputElement;
    setQuantity(Number(quantity.value));
  }

  async function handleAddProductInCart() {
    const descriptionProduct =
      descPrincipal.current!.value.trimEnd() +
      ' - ' +
      descVariant.current!.value.trimStart();
    const weightProduct = peso.current!.value;
    const priceProduct = String(
      Number(price.current!.value.replace(',', '.')) * quantity
    );
    const idOrder = dataClient.id;

    setIdActiveOrder(idOrder);

    if (
      descriptionProduct !== '' &&
      weightProduct !== '' &&
      priceProduct !== '' &&
      quantity !== 0
    ) {
      const newItem: NewProdcutProps = {
        id: cuid(),
        weight: weightProduct,
        price: priceProduct,
        description: descriptionProduct,
        quantity,
        obs: obsProduct,
      };

      setOrder((prev) => [...prev, newItem]);

      handlerSetObsProduct('');

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
        descPrincipal.current!.value = item.description.split('-')[0];
        descVariant.current!.value = item.description.split('-')[1];
        peso.current!.value = item.weight;
        price.current!.value = String(Number(item.price) / item.quantity);
        setQuantity(item.quantity);
      }
      return null;
    });

    setOrder(newList);
  }

  async function handleGetListProducts() {
    const newListProducts = await getAllProducts();

    setListProducts(newListProducts);
  }

  async function handleGetProductsVariant(variant: string) {
    const productsVariants = await getAllProductsVariant(variant);

    if (variant !== '') {
      setListVariantProducts(productsVariants);
    }
  }

  useEffect(() => {
    handleSetActiveOrder();
    handleGetListProducts();
  }, []);

  const [open, setOpen] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);

  return (
    <WaperContainer>
      <Header title='Bolacha Maria - Editar Encomenda' />
      <form id='orderForm'>
        <FieldsContainer>
          <h3>Dados encomenda</h3>
          <div>
            <label htmlFor='num_encomenda'>
              <span>Nº Encomenda</span>
              <InputIDContainer
                value={dataClient.id}
                readOnly
                id='num_encomenda'
              />
            </label>
            <label htmlFor='nome_cliente'>
              <span>Nome cliente</span>
              <InputContainer
                type='text'
                variant='15rem'
                id='nome_cliente'
                onChange={handleChangeNameClient}
                value={dataClient.name}
              />
            </label>
            <label htmlFor='telemovel'>
              <span>Telemovel</span>
              <InputContainer
                type='number'
                id='telemovel'
                variant='15rem'
                onChange={handleChangeContactClient}
                value={dataClient.contact}
              />
            </label>
            <label htmlFor='data_entrega'>
              <span>Data/Hora</span>
              <InputContainer
                type='datetime-local'
                id='data_entrega'
                variant='20rem'
                onChange={handleChangeDateClient}
                value={dataClient.date}
              />
            </label>

            <datalist id='status-order'>
              <option value='pendente' />
              <option value='entregue' />
              <option value='cancelada' />
            </datalist>

            <label htmlFor='status'>
              <span>Status</span>
              <InputContainer
                type='text'
                id='status'
                variant='15rem'
                list='status-order'
                onChange={handleChangeStatusClient}
                value={dataClient.status}
              />
            </label>
            <DialogRoot open={openOrder}>
              <ButtonInfoEncomenda onClick={() => setOpenOrder(true)}>
                <Info size={32} color='#fff' />
              </ButtonInfoEncomenda>
              <ObsOrderModal closeModal={setOpenOrder} />
            </DialogRoot>
          </div>
        </FieldsContainer>
      </form>
      <WarperTableContainer>
        <datalist id='products'></datalist>
        <datalist id='peso'>
          {listVariantProducts.map((product) => {
            return <option value={product.weight} />;
          })}
        </datalist>
        <datalist id='description'>
          {listProducts.map((product) => {
            return <option value={product.type} />;
          })}
        </datalist>
        <datalist id='variant'>
          {listVariantProducts.map((product) => {
            return <option value={product.variant} />;
          })}
        </datalist>
        <datalist id='price'>
          {listVariantProducts.map((product) => {
            return <option value={product.price.split(' ')[0]} />;
          })}
        </datalist>

        <FieldsItemContainer>
          <ButtonCriarEncomendaContainer onClick={handleUpdateOrder}>
            <FloppyDisk size={25} /> Salvar encomenda
          </ButtonCriarEncomendaContainer>
          <h3>Novo item</h3>
          <div>
            <InputContainerDefault
              ref={descPrincipal}
              type='text'
              list='description'
              onChange={() =>
                handleGetProductsVariant(descPrincipal.current!.value)
              }
            />
            <InputContainerBigger
              ref={descVariant}
              type='text'
              list='variant'
            />
            <InputContainerSmall ref={peso} type='text' list='peso' />
            <InputContainerSmall ref={price} type='text' list='price' />

            <div className='buttons'>
              <button onClick={handleDecreaseQuantity}>
                <MinusCircle size={25} />
              </button>
              <span>
                <InputQuantityContainer
                  placeholder='0'
                  onChange={handleChangeQuantity}
                  value={quantity}
                  id='quantity'
                  type={'number'}
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
              <Dialog.Root open={open}>
                <ButtonInfoEncomenda onClick={() => setOpen(true)}>
                  <Info size={32} />
                </ButtonInfoEncomenda>
                <ObsModal closeModal={setOpen} />
              </Dialog.Root>
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
                    <td>{item.description}</td>
                    <td>{item.weight}</td>
                    <td>{priceFormatter.format(Number(item.price))}</td>
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
