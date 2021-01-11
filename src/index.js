import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import GlobalStyle from "./globalStyles"
import styled from 'styled-components';
import reportWebVitals from './reportWebVitals';



const HomepageContainer = styled.div`
  background-image: url("/background.png");
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-color: #555;
  background-size: cover;  
  height: 120vh;
  width: 100%;
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
      <Router>
        <HomepageContainer>
          <App />
        </HomepageContainer>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
