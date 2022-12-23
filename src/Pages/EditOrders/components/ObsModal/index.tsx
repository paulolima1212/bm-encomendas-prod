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

  function handleSetObsProduct(e: FormEvent) {
    e.preventDefault();

    const obs = e.currentTarget.firstChild as HTMLTextAreaElement;
    handlerSetObsProduct(obs.value);
    closeModal(false);
  }

  return (
    <ObsModalContainer>
      <ObsModalContent />
      <Content>
        <TitleContent>Observações do Produto</TitleContent>
        <form onSubmit={handleSetObsProduct}>
          <textarea name='obsProduct' />
          <button type='submit'>Confirmar</button>
        </form>
      </Content>
    </ObsModalContainer>
  );
}
