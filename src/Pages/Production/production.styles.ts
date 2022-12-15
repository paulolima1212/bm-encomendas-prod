import styled from 'styled-components';

export const ProductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  gap: 3rem;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 2rem;
  padding: 3rem;
  background: ${({ theme }) => theme['gray-500']};
  border-radius: 8px;
`;

export const TableContainer = styled.div`
  display: flex;
  width: 100%;
  background: ${({ theme }) => theme['gray-800']};
  border-radius: 8px;
  padding: 1rem;

  table {
    width: 100%;
    color: ${({ theme }) => theme['gray-100']};

    th {
      text-align: left;
      padding: 1rem;
      background: ${({ theme }) => theme['gray-500']};
      color: ${({ theme }) => theme['gray-900']};

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
        max-width: 5%;
      }
    }

    td {
      padding: 1rem;
      background: ${({ theme }) => theme['gray-300']};
      border-top: 4px solid ${({ theme }) => theme['gray-800']};
      color: ${({ theme }) => theme['gray-900']};

      &:first-child {
        border-bottom-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-bottom-right-radius: 8px;
        padding-right: 1.5rem;
        max-width: 5%;
      }
    }
  }
`;

export const WaperFields = styled.div`
  display: flex;

  input {
    display: none;
  }

  input.active {
    display: initial;
  }
`;
