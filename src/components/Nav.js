import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/login">Login</Link>
            <Link to="/logout">Logout</Link>
        </nav>
    );
}

export default Nav;