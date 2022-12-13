import { Link } from 'react-router-dom';
import { HeaderContainer } from './header.styles';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <HeaderContainer>
      <h1>{title}</h1>
      <nav>
        <ul>
          <li>
            <Link to={'/novaencomenda'} />
          </li>
          <li>
            <Link to={'/listaencomendas'} />
          </li>
          <li>
            <Link to={'/listaprodutos'} />
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  );
}
