import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';


const SignUp = styled.div`
    text-decoration: underline;
`;



const initialFormValues = {
    username: '',
    email: '',
    password: ''
}

function Login(props) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    
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
        axios.post(
                'http://localhost:2019/login',
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
                history.push("/recipes");
            })
            .catch(err => {
                console.log(err);
            });
    }


    const signUp = (e) => {
        e.preventDefault();

        axios.post(
                'http://localhost:2019/createnewuser', formValues)
            .then(res => {
                localStorage.setItem("token", res.data.access_token);
                setIsCreatingAccount(!isCreatingAccount);
            })
            .catch(err => {
                console.log(err);
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
                    <button>Login</button>
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
                    <button>Sign Up</button>
                </form>
            )}            
        </div>
    );
}

export default Login;