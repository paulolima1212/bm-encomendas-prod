import { House, Scroll } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { HeaderContainer, NavContainer } from './header.styles';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <HeaderContainer>
      <h1>{title}</h1>
      <NavContainer>
        <ul>
          <li>
            <Link to={'/'}>
              <House size={32} />
            </Link>
          </li>
          <li>
            <Link to={'/resumoencomendas'}>
              <Scroll size={32} />
            </Link>
          </li>
        </ul>
      </NavContainer>
    </HeaderContainer>
  );
}
