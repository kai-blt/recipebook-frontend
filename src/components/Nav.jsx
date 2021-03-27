import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../state/ducks';
import styled from 'styled-components';


function Nav(props) {
  //Redux State Managers
  const dispatch = useDispatch();
  const { isLoggedIn, status } = useSelector(state => state.user);
  
  const { push } = useHistory();

  useEffect(() => {
    if (status === 'logout/success') {
      push('/');
    }
  }, [status, push]);

  const logOut = () => {
    dispatch(userActions.logout());
  };

  return(
    <nav>
      <h1>RECIPE BOOK</h1>
      {isLoggedIn ?  <LogOut onClick={logOut}>Logout</LogOut> : null}
    </nav>
  );
};


//Component Styles
const LogOut = styled.div`
  text-decoration: underline;
  transition: all 0.5s;
  &:hover {
    color: #555;
  }
`;


export default Nav;