import styled from 'styled-components';

export const WaperContainer = styled.div`
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme['gray-400']};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 2rem;
`;

export const FieldsContainer = styled.div`
  padding-bottom: 1rem;
  color: ${({ theme }) => theme.white};
  gap: 1.5rem;

  & > div {
    height: 7rem;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background: ${({ theme }) => theme['gray-600']};
    color: ${({ theme }) => theme.white};
    gap: 4rem;
    padding: 1rem;

    text-align: left;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const WarperTableContainer = styled.div`
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.white};
  padding: 0rem 3rem;
  background: ${({ theme }) => theme['gray-600']};
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
    }

    td {
      background: ${({ theme }) => theme['gray-300']};
      border-top: 4px solid ${({ theme }) => theme['gray-800']};
      padding: 1rem;
      font-size: 1.6rem;
      line-height: 1.6;
      width: 15%;

      &:first-child {
        width: 50%;
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

export const TableContainer = styled.div`
  display: flex;
  max-height: 38rem;
  flex-direction: column;
  overflow: scroll;
  border-radius: 5px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BaseInputField = styled.input`
  height: 3.2rem;
  border-radius: 4px;
  background: ${({ theme }) => theme['gray-300']};
  border: 0;
  border-bottom: solid 4px transparent;
  padding: 1rem;
`;

export const InputIDContainer = styled(BaseInputField)`
  width: 8rem;
  background: ${({ theme }) => theme['gray-400']};
`;

interface InputFieldsContainerProps {
  variant?: '15rem' | '20rem' | '25rem';
}

export const InputContainer = styled(BaseInputField)<InputFieldsContainerProps>`
  width: ${({ variant }) => variant};
  background: ${({ theme }) => theme['gray-300']};
`;

export const InputQuantityContainer = styled.input`
  height: 3.2rem;
  width: 6rem;
  background: ${({ theme }) => theme['gray-300']};
  text-align: center;
`;

export const InputPesoContainer = styled.input`
  height: 3.2rem;
  width: 2rem;
  background: ${({ theme }) => theme['gray-300']};
  text-align: center;
`;

export const ButtonCriarEncomendaContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  padding: 1rem 1rem;
  background: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme.white};
  font-weight: 800;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  opacity: 70%;

  &:not(:disabled) {
    cursor: pointer;
    opacity: 100%;
  }
`;

export const ButtonCartEncomenda = styled.button`
  height: 1rem;
  width: 1rem;
  border: none;
  background: transparent;
`;

export const WaperButtonContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 0 2rem;
  gap: 2.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  width: 10rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

export const FieldsItemContainer = styled.div`
  padding: 2rem 0;
  gap: 0.8rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .buttons {
    width: 10rem;
    display: flex;
    justify-content: space-between;
    gap: 0.8rem;

    button {
      border: none;
      background: transparent;
      color: ${({ theme }) => theme['green-500']};
    }

    input {
      width: 6rem;
      border: none;
      border-radius: 5px;
      border-bottom: solid 2px transparent;

      &:focus {
        border-color: ${({ theme }) => theme['green-500']};
      }
    }
  }

  & > div {
    display: flex;
    gap: 2rem;
    padding: 1.5rem 1rem;
    width: 100%;
    background: ${({ theme }) => theme['gray-500']};
    border-radius: 5px;
    overflow: scroll;
    align-items: center;
    justify-content: center;
    &::-webkit-scrollbar {
      display: none;
    }

    & > input {
      height: 4rem;
    }
  }
`;

const BaseInput = styled.input`
  border-radius: 5px;
  border: none;
  background: ${({ theme }) => theme['gray-300']};
  border-bottom: solid 2px transparent;
`;

export const InputContainerDefault = styled(BaseInput)`
  width: 20rem;
`;

export const InputContainerSmall = styled(BaseInput)`
  width: 15rem;
`;

export const InputContainerBigger = styled(BaseInput)`
  width: 35rem;
`;
