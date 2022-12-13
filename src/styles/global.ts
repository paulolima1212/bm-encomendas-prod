import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

*{
 padding: 0;
 margin: 0;
 box-sizing: border-box;
 text-decoration: none;
 list-style: none;
}

:focus{
 outline: none;
}

html{
 font-size: 62.5%;
}

body{
 min-height: 100vh;
}

body, input, button, textarea{
 font-size: 1.6rem;
 font-family: 'Roboto', sans-serif;
}
`;
