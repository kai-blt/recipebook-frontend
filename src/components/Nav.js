import React from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../axios/axiosWithAuth';
import styled from 'styled-components';

const LogOut = styled.div`
    text-decoration: underline;
    transition: all 0.5s;
    &:hover {
        color: #555;
    }
`;

function Nav(props) {
    const { isLoggedIn, setIsLoggedIn } = props;
    const history = useHistory();

    const handleLogOut = () => {
        localStorage.setItem("token", '');

        axiosWithAuth().get('/logout')
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });

        setIsLoggedIn(false)
        history.push('/');
    }

    return(
        <nav>
            <h1>RECIPE BOOK </h1>
            {isLoggedIn ?  <LogOut onClick={handleLogOut}>Logout</LogOut> : null}
        </nav>
    );
}

export default Nav;