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

  function handleSetObsOrder(e: React.MouseEvent<HTMLButtonElement>) {
    const obs = e.currentTarget.previousElementSibling as HTMLTextAreaElement;
    handlerSetObsOrder(obs.value);
    closeModal(false);
  }

  return (
    <ObsModalContainer>
      <ObsModalContent />
      <Content>
        <TitleContent>Observações da Entrega</TitleContent>
        <div>
          <textarea name='obsOrder' />
          <button type='button' onClick={handleSetObsOrder}>
            Confirmar
          </button>
        </div>
      </Content>
    </ObsModalContainer>
  );
}
