import { FormEvent } from 'react';
import {
  Content,
  ObsModalContainer,
  ObsModalContent,
  TitleContent,
} from './styles';
import { useOrdersContext } from '../../../../hooks/useOrdersContext';

interface ObsModalProps {
  closeModal: (value: boolean) => void;
}

export function ObsModal({ closeModal }: ObsModalProps) {
  const { handlerSetObsProduct } = useOrdersContext();

  function handleSetObsProduct(e: React.MouseEvent<HTMLButtonElement>) {
    const obs = e.currentTarget.previousElementSibling as HTMLTextAreaElement;
    handlerSetObsProduct(obs.value);
    closeModal(false);
  }

  return (
    <ObsModalContainer>
      <ObsModalContent />
      <Content>
        <TitleContent>Observações do Produto</TitleContent>
        <div>
          <textarea name='obsProduct' />
          <button type='button' onClick={handleSetObsProduct}>
            Confirmar
          </button>
        </div>
      </Content>
    </ObsModalContainer>
  );
}
