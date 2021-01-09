import { createGlobalStyle } from "styled-components/macro";

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap');

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
        font-family: 'Roboto', sans-serif;
        font-size: 62.5%;
        margin: 0;
        padding: 0;
    }

    body {
        font-weight: 300;
        font-size: 1.6rem;
        letter-spacing: 0.5px;
        color: #fff;
        background-color: #444;
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
    }


    nav {
        font-size: 2rem;      
        margin: 2% 0;  
        width: 80%;
        border: 2px solid blue;    
    }

    img {
        width: 100%;
        border-radius: 10px;
    }

    a {
        color: seagreen;
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
        margin: 1% 0;
    }

    h1 {
        font-size: 10rem;
    }

    h2 {
        font-size: 4rem;
    }

    h3 {
        font-size: 2rem;
    }

    h4 {
        font-size: 1.6rem;
    }


    label {
        font-weight: 700;
        font-size: 2rem;
    }

    input {
        width: 100%;
        padding: 2% 2%;
        margin: 2% 0;
        border: 1px solid #999;
        border-radius: 6px;
    }

    button {
        width: 100%;
        padding: 2% 2%;
        font-size: 2rem;
        font-weight: 500;
        border: 1px solid #999;
        border-radius: 6px;
        transition: all 0.5s;
    
        &:hover {
            color: #fff;
            background-color: #555;
            transition: all 0.5s;
        }
    }
`;