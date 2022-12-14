import styled from 'styled-components';

export const WaperContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;

  h1 {
    color: ${({ theme }) => theme.white};
  }
`;

export const WarperTableContainer = styled.div`
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.white};
  padding: 2rem 1rem;
  background: ${({ theme }) => theme['gray-400']};
  border-radius: 8px;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
    color: ${({ theme }) => theme.black};

    .peso {
      width: 8rem;
    }

    th {
      background: ${({ theme }) => theme['gray-500']};
      padding: 1rem;
      padding-left: 2rem;
      text-align: left;
      color: ${({ theme }) => theme['gray-600']};
      font-weight: 900;
      font-size: 1.2rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
        max-width: 5%;
      }

      .filterField {
        display: none;
      }

      .filterField.active {
        display: initial;
      }
    }

    td {
      background: ${({ theme }) => theme['gray-300']};
      border-top: 4px solid ${({ theme }) => theme['gray-800']};
      padding: 1rem;
      font-size: 1.6rem;
      line-height: 1.6;
      width: 15%;

      &:first-child {
        width: 15%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
        max-width: 5%;
      }

      input {
        background: transparent;
        border: 0;
        border-bottom: solid 1px ${({ theme }) => theme['gray-800']};
        margin-left: 1rem;
      }

      span {
        padding: 0 1.12rem;

        input {
          text-align: center;
          margin-right: 1rem;
        }
      }

      button {
        display: inline;
        justify-content: center;
        align-items: center;
        border: none;
        background: transparent;
        cursor: pointer;
        color: ${({ theme }) => theme['green-500']};
        font-weight: 800;
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export const WaperFields = styled.div`
  display: flex;
  gap: 0.8rem;

  span {
    cursor: pointer;
  }

  & > input {
    max-width: 8rem;
  }
`;

const STATUS_COLOR = {
  entregue: 'green-500',
  pendente: 'yellow',
  cancelada: 'danger',
} as const;

interface StatusContainerProps {
  statusColor: keyof typeof STATUS_COLOR;
}

export const StatusContainer = styled.span<StatusContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  gap: 1rem;
  &::before {
    content: '';
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 999px;
    background: ${({ theme, statusColor }) => theme[STATUS_COLOR[statusColor]]};
  }
`;
