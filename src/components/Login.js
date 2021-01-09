import React, { useState }from 'react';
import axios from 'axios';

const initialFormValues = {
    username: '',
    password: ''
}

function Login(props) {
    const [formValues, setFormValues] = useState(initialFormValues);
    
    const onChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
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
                props.history.push("/recipes");
            })
            .catch(err => {
                console.log(err);
            });

        setFormValues(initialFormValues);
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
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
        </div>
    );
}

export default Login;