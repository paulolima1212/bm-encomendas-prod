import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.modal};
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainModalContainer = styled.div`
  position: relative;
  width: 76rem;
  height: 45rem;
  background: ${({ theme }) => theme['gray-300']};
  border-top-right-radius: 40px;
  border-bottom-left-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;

  h2 {
    padding: 2rem;
    font-size: 3rem;
    color: ${({ theme }) => theme['gray-900']};
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
  }
`;

export const UlContainer = styled.ul`
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  padding: 1rem;
  border-bottom: solid 2px ${({ theme }) => theme['green-500']};
  margin-bottom: 2rem;
  justify-content: space-between;

  li {
    display: flex;
    gap: 1rem;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme['gray-800']};
  width: 100%;

  table {
    width: 100%;

    th {
      text-align: left;
      color: ${({ theme }) => theme['gray-100']};
      padding: 1rem;
    }

    td {
      background: ${({ theme }) => theme['gray-400']};
      padding: 0.8rem;
    }
  }
`;

export const ButtonContainer = styled.button`
  position: absolute;

  left: 50%;
  bottom: 5%;
  border: none;

  border-radius: 8px;
  background: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme['gray-100']};

  width: 14rem;
  height: 3rem;
  transform: translateX(-50%);
`;
