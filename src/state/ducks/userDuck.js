import axios from 'axios';
import axiosWithAuth from '../../axios/axiosWithAuth';

/******************************************************
 * USER ACTION TYPES
 ******************************************************/
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_RESOLVE = 'LOGIN_RESOLVE';

export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const SIGNUP_RESOLVE = 'SIGNUP_RESOLVE';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const LOGOUT_RESOLVE = 'LOGOUT_RESOLVE';


/******************************************************
 * USER ACTIONS
 ******************************************************/

export const userActions = {

  // LOGIN USER
  login: (username, password) => dispatch => {
    dispatch({ type: LOGIN_START });

    axios
      .post(
        'https://kaiblt-recipebook.herokuapp.com/login',
        `grant_type=password&username=${username}&password=${password}`,
          {
            headers: {
              // btoa is converting our client id/client secret into base64
              Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
      )
      .then(res => {
          dispatch({ type: LOGIN_SUCCESS });
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("username", username);
      })
      .catch(err => {
          dispatch({ type: LOGIN_FAIL, payload: JSON.parse(JSON.stringify(err.response.data.error_description))});
      })
      .finally(() => dispatch({ type: LOGIN_RESOLVE }));
  },

  // SIGNUP USER
  signup: (formValues) => dispatch => {
    dispatch({ type: SIGNUP_START });

    axios.post(
      'https://kaiblt-recipebook.herokuapp.com/createnewuser', formValues)
    .then(res => {
        dispatch({ type: SIGNUP_SUCCESS });
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("username", formValues.username);
    })
    .catch(err => {
        dispatch({ type: SIGNUP_FAIL, payload: JSON.parse(JSON.stringify(err.response.data.error_description)) });
    })
    .finally(() => dispatch({ type: SIGNUP_RESOLVE }));    
  },

   // LOGOUT USER
   logout: (formValues) => dispatch => {
    dispatch({ type: LOGOUT_START });

    axiosWithAuth()
      .get('/logout')
      .then(res => {
        dispatch({ type: LOGOUT_SUCCESS });
        localStorage.setItem("token", '');
      })
      .catch(err => {
        dispatch({ type: LOGOUT_FAIL, payload: JSON.parse(JSON.stringify(err.response.data.error_description)) });
      })
      .finally(() => dispatch({ type: LOGOUT_RESOLVE }));    
  },

};

/******************************************************
 * USER INITIAL STATE
 ******************************************************/
export const userInitialState = {
  user: null,
  role: null,
  isLoggedIn: false,
  isCreatingAccount: false,
  status: 'idle',
  error: '',
};

/******************************************************
 * USER REDUCER
 ******************************************************/
const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    // LOGIN
    case LOGIN_START:
      return { ...state, status: 'login/pending' };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        status: 'login/success',
        error: ''
      };
    case LOGIN_FAIL:
      return { ...state, status: 'login/error', error: action.payload };
    case LOGIN_RESOLVE:
      return { ...state, status: 'idle' };

     // LOGOUT
    case LOGOUT_START:
      return { ...state, status: 'logout/pending' };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        status: 'logout/success',
        error: ''
      };
    case LOGOUT_FAIL:
      return { ...state, status: 'logout/error', error: action.payload };
    case LOGOUT_RESOLVE:
      return { ...state, status: 'idle' };

    // SIGNUP
    case SIGNUP_START:
      return { ...state, status: 'signup/pending' };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        status: 'signup/success',
        error: ''
      };
    case SIGNUP_FAIL:
      return { ...state, status: 'signup/error', error: action.payload };
    case SIGNUP_RESOLVE:
      return { ...state, status: 'idle' };

    // DEFAULT
    default:
      return state;
  }
};

export default userReducer;
