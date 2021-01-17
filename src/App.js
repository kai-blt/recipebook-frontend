import { useState } from 'react';
import { Switch, Route } from 'react-router';
import Nav from './components/Nav';
import Home from './components/Home';
import Recipes from './components/Recipes';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  margin: auto;  

  @media(max-width: 700px) {
    width: 95%;
  }

  @media(max-width: 500px) {
    width: 95%;
  }
`;


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <AppContainer>      
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Switch>
        <Route path="/recipes">
          <Recipes />
        </Route>
        <Route path="/">
          <Home setIsLoggedIn={setIsLoggedIn} />
        </Route>
      </Switch>
    </ AppContainer>
    </>
  );
}

export default App;
