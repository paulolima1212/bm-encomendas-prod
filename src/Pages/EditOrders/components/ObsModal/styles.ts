import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';

export const ObsModalContainer = styled(Dialog.Portal)``;

export const ObsModalContent = styled(Dialog.Overlay)`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  position: fixed;
  inset: 0;
`;

export const Content = styled(Dialog.Content)`
  min-width: 55rem;
  height: 45rem;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme['gray-100']};
  border-radius: 8px 40px 8px 40px;
  justify-content: flex-start;
  align-items: center;
  padding: 3rem;
  gap: 1.5rem;

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    textarea {
      flex: 1;
      border-radius: 6px;
      font-size: 2.5rem;
    }

    button {
      margin: 0 auto;
      padding: 0.8rem 3.5rem;
      border-radius: 6px;
      border: none;
      background: ${({ theme }) => theme['green-500']};
      color: ${({ theme }) => theme['gray-100']};
      font-weight: bold;

      &:hover {
        background: ${({ theme }) => theme['green-700']};
      }
    }
  }
`;

export const TitleContent = styled(Dialog.Title)``;
