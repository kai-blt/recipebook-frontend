import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import spinner from '../assets/spinner.gif';
import styled from 'styled-components';
import axios from 'axios';



const SignUp = styled.div`
    text-decoration: underline;
    &:hover {
        color: #555;
    }
`;

const Spinner = styled.img`
    width: 10%;
`;

const initialFormValues = {
    username: '',
    email: '',
    password: ''
}

const ErrorMessages = styled.div`
    color: #d9534f;
`;

function Login(props) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [errors, setErrors] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const history = useHistory();

    const onChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        setIsCreatingAccount(!isCreatingAccount)
    }

    const signIn = (e) => {
        e.preventDefault();

        setIsLoading(true);

        axios.post(
                'https://kaiblt-recipebook.herokuapp.com/login',
                `grant_type=password&username=${formValues.username}&password=${formValues.password}`,
                {
                    headers: {
                        // btoa is converting our client id/client secret into base64
                        Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                },
            )
            .then(res => {
                console.log(res.data);
                localStorage.setItem("token", res.data.access_token);
                localStorage.setItem("username", formValues.username)
                setIsLoading(false);
                history.push("/recipes");
            })
            .catch(err => {
                console.log(JSON.parse(JSON.stringify(err.response.data.error_description)));
                setErrors(JSON.parse(JSON.stringify(err.response.data.error_description)));
                setIsLoading(false);
            });
    }


    const signUp = (e) => {
        e.preventDefault();
        setIsLoading(true);

        axios.post(
                'https://kaiblt-recipebook.herokuapp.com/createnewuser', formValues)
            .then(res => {
                localStorage.setItem("token", res.data.access_token);
                setIsLoading(false);
                setIsCreatingAccount(!isCreatingAccount);
            })
            .catch(err => {
                console.log(JSON.parse(JSON.stringify(err.response.data.error_description)));
                setErrors(JSON.parse(JSON.stringify(err.response.data.error_description)));
                setIsLoading(false);
            });
    }

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
                    <div>{isLoading ? <Spinner src={spinner} alt="spinner"/>: <button>Log In</button>}</div>
                </form>
                <SignUp onClick={handleClick}>Don't have an account? Sign Up!</SignUp>
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
                    <div>{isLoading ? <Spinner src={spinner} alt="spinner"/> : <button>Sign Up</button>}</div>
                </form>
            )}
            <ErrorMessages>
                {errors}
            </ErrorMessages>            
            </div>
    );
}

export default Login;