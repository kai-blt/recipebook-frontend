import React from 'react';
import Login from './Login';

function Home(props) {
    return(
        <div>
            <h1>RECIPE BOOK </h1>
            <div>
                <p>A service for you to store all of your favorite recipes</p>
            </div>
            <section>
                <Login />
            </section>
        </div>
    );
}

export default Home;