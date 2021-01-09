import { Switch, Route } from 'react-router';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Recipes from './components/Recipes';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 80%;
  margin: auto;
`;


function App() {
  return (
    <AppContainer>
      <Nav />
      <Switch>
        <Route path="/recipes">
          <Recipes />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </ AppContainer>
  );
}

export default App;
