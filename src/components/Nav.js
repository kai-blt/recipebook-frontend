import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const LogOut = styled.div`
    text-decoration: underline;
`;

function Nav(props) {
    const history = useHistory();

    const handleLogOut = () => {
        localStorage.setItem("token", '');
        history.push('/');
    }

    return(
        <nav>
            <h1>RECIPE BOOK </h1>
            {(localStorage.getItem("token") !== "") ?  <LogOut onClick={handleLogOut}>Logout</LogOut> : <div></div>}
        </nav>
    );
}

export default Nav;