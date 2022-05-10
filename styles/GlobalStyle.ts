import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
//
const GlobalStyle = createGlobalStyle`
${reset}
* {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  button {
    border: none;
    background-color: transparent;
  }
`;

export default GlobalStyle;
