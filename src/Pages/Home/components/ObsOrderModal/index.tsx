import { FormEvent } from 'react';
import {
  Content,
  ObsModalContainer,
  ObsModalContent,
  TitleContent,
} from './styles';
import { useOrdersContext } from '../../../../hooks/useOrdersContext';

interface ObsOrderModalProps {
  closeModal: (value: boolean) => void;
}

export function ObsOrderModal({ closeModal }: ObsOrderModalProps) {
  const { handlerSetObsOrder } = useOrdersContext();

  function handleSetObsOrder(e: FormEvent) {
    e.preventDefault();

    const obs = e.currentTarget.firstChild as HTMLTextAreaElement;
    handlerSetObsOrder(obs.value);
    closeModal(false);
  }

  return (
    <ObsModalContainer>
      <ObsModalContent />
      <Content>
        <TitleContent>Observações da Entrega</TitleContent>
        <form id='form-order-obs' onSubmit={handleSetObsOrder}>
          <textarea name='obsOrder' />
          <button type='submit' formTarget='form-order-obs'>
            Confirmar
          </button>
        </form>
      </Content>
    </ObsModalContainer>
  );
}
