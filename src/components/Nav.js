import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
    return(
        <nav>
            {localStorage.getItem("token") !== '' 
                ? <Link to="/logout">Logout</Link>
                : null
            }
        </nav>
    );
}

export default Nav;