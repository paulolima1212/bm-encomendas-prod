import { useOrdersContext } from '../../../../hooks/useOrdersContext';
import { ModalContainer } from './modal.styles';

export function ModalListOrders() {
  const { handleSetStatusModal } = useOrdersContext();

  return (
    <ModalContainer onClick={handleSetStatusModal}>
      <h1>orders</h1>
    </ModalContainer>
  );
}
