import { createGlobalStyle } from "styled-components/macro";

export default createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
  v2.0 | 20110126
  License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }


  /* BASE CSS BEGIN */
  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Montserrat', sans-serif;
    font-size: 62.5%;
    margin: 0;
    padding: 0;
  }

  body {
    font-weight: 300;
    font-size: 1.6rem;
    letter-spacing: 0.5px;    
    line-height: 2.5rem;
    color: #fff;
    background-image: url("/background.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-color: #555;
    background-size: cover;  
    width: 100%;
    margin: 0;
    padding: 0;
  }


  nav {
    font-size: 2rem;    
    text-align: center;
    margin: 2% 0;  
    width: 100%;   
  }

  img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 4%;
  }

  a {
    color: #fff;
    text-decoration: none;
    margin-right: 2%;
    transition: all 0.3s;
    &:hover {
      color: #fff;
      transition: all 0.3s;
    }
  }

  p {
    margin: 4% 0;
  }

  strong {
    font-weight: 700;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    color: #5bc0de;    
    margin-top: 2%;
    margin-bottom: 2%;
    text-shadow: 2px 2px 6px #222;
  }

  h1 {
    font-size: 10rem;
  }

  h2 {
    font-size: 4rem;
    line-height: 4.5rem;
    padding-bottom: 4%;
  }

  h3 {
    font-size: 2.5rem;
  }

  h4 {
    font-size: 1.75rem;
    color: #888;
    margin: 0;
  }


  label {
    font-weight: 500;
    font-size: 1.5rem;
  }

  input {
    font-size: 1.6rem;
    font-family: 'Montserrat', sans-serif;
    line-height: 2.5rem;
    width: 100%;
    border: 1px solid #999;
    border-radius: 6px;
    
    &:invalid {
      border: 2px solid red;
    }
  }

  form {
    width: 100%;
  }

  button {
    width: 100%;
    padding: 2%;
    margin: 4% 0;
    font-size: 2rem;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    border: 0;
    border-radius: 6px;
    color: #fff;
    background-color:  #5bc0de;   
    transition: all 0.5s;
  
    &:hover {
      color: #fff;
      background-color: #555;
      transition: all 0.5s;
    }   
  }
  
  button.submitBtn {
    width: 60%;
    background-color: #5bc0de;
  }

  button.addBtn {
    width: 100%;
    font-weight: 700;
    font-size: 2.5rem;
    background-color: #5bc0de;
  }

  button.deleteBtn {
    width: 30%;
    background-color: #d9534f;
  }

  button.deleteBtn2 {
    width: 100%;
    font-weight: 700;
    font-size: 2.5rem;
    background-color: #d9534f;
  }


  button.cancelBtn {
    width: 100%;
    background-color: #d9534f;
  }

  button.disabled {
    width: 100%;
    background-color: #555;
  }

  @media(max-width: 1200px) {
    h1 {
      font-size: 8rem;
      line-height: 7rem;
    }

    h2 {
      font-size: 3.5rem;
      line-height: 3rem;
      padding-bottom: 4%;
    }

    h3 {
      font-size: 3rem;
    }

    h4 {
      font-size: 1.75rem;
    }

    button {
      font-size: 1.5rem;
    }
  }

  @media(max-width: 700px) {
    h1 {
      font-size: 7.5rem;
      line-height: 7rem;
    }

    h2 {
      font-size: 3rem;
      padding-bottom: 4%;
    }

    h3 {
      font-size: 1.5rem;
    }

    h4 {
      font-size: 1.5rem;
    }

    button {
      font-size: 1.5rem;
    }
  }

  @media(max-width: 500px) {
    h1 {
      font-size: 4rem;
    }

    h2 {
      font-size: 2rem;
      padding-bottom: 4%;
    }

    h3 {
      font-size: 2rem;
    }

    h4 {
      font-size: 1.5rem;
    }

    label {
      font-size: 1.25rem;
    }

    button {
      font-size: 1.5rem;
      padding: 4%;
    }
  }
`;