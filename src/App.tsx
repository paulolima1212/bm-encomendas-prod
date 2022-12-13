import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/theme/defaultTheme.styles';
import { BrowserRouter as Browser } from 'react-router-dom';
import { Router } from './Router';

export function App() {
  return (
    <Browser>
      <ThemeProvider theme={defaultTheme}>
        <Router />
        <GlobalStyle />
      </ThemeProvider>
    </Browser>
  );
}
