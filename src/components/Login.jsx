import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../state/ducks';

import spinner from '../assets/spinner.gif';
import styled from 'styled-components';


const initialFormValues = {
  username: '',
  email: '',
  password: ''
}

function Login(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  
  const { push } = useHistory();
  
  //Redux State Managers
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.user);
  
  useEffect(() => {
    if (status === 'login/success') {
      push('/recipes');
    };
  }, [status, error, push]);
  
  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const createAccount = () => {
    setIsCreatingAccount(!isCreatingAccount);
  };

  const signIn = (e) => {
    e.preventDefault();
    const { username, password } = formValues;
    dispatch(userActions.login(username, password));
  };


  const signUp = (e) => {
    e.preventDefault();    
    dispatch(userActions.signup(formValues));
    setIsCreatingAccount(!isCreatingAccount);
  };

  return(
    <div>
      {!isCreatingAccount
      ? (
        <>
        <form onSubmit={signIn}>
          <label>Username&nbsp;
            <input
              type="text"
              name="username"
              onChange={onChange}
            />
          </label>
          <label>Password&nbsp;
            <input
              type="password"
              name="password"
              onChange={onChange}
            />
          </label>        
          <div>{status === 'login/pending' ? <Spinner src={spinner} alt="spinner"/>: <button>Log In</button>}</div>
        </form>
        <SignUp onClick={createAccount}>Don't have an account? Sign Up!</SignUp>
        </>
      )
      : (
        <form onSubmit={signUp}>
          <label>Username&nbsp;
            <input
              type="text"
              name="username"
              onChange={onChange}
            />
          </label>
          <label>Email&nbsp;
            <input
              type="email"
              name="email"
              onChange={onChange}
            />
          </label>   
          <label>Password&nbsp;
            <input
              type="password"
              name="password"
              onChange={onChange}
            />
          </label> 
          <div>{status === 'login/pending' ? <Spinner src={spinner} alt="spinner"/> : <button>Sign Up</button>}</div>
        </form>
      )}
      <ErrorMessages>
        {error}
      </ErrorMessages>      
    </div>
  );
}

//Component Styles
const SignUp = styled.div`
  text-decoration: underline;
  transition: all 0.5s;
  &:hover {
    color: #555;
  }
`;

const Spinner = styled.img`
  width: 10%;
`;

const ErrorMessages = styled.div`
  color: #d9534f;
`;


export default Login;