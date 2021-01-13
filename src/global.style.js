import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
    box-sizing: border-box;
}
body {
    padding: 20px 60px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: rgb(215, 250, 228);
    @media screen and (max-width: 800px){
      padding: 10px;
    }
  }
  
  a {
    text-decoration: none;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
  }
.fade-enter {
    opacity: 0;
    transform: translateY(-100%);
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateX(0%);
  }
  .fade-exit {
    opacity: 1;
    transform: translateX(0%);
  }
  .fade-exit-active {
    opacity: 0;
    transform: translateX(100%);
  }
  .fade-enter-active,
  .fade-exit-active {
    transition: opacity 500ms, transform 500ms;
  }

`;
