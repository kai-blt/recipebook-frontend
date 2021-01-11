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
  width: 70%;
  height: 100vh;
  margin: auto;  
`;


function App() {
  return (
    <>
    <AppContainer>      
      <Nav />
      <Switch>
        <Route path="/recipes">
          <Recipes />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </ AppContainer>
    </>
  );
}

export default App;
