import React from 'react';
import Login from './Login';

function Home(props) {
    return(
        <div>
            <h1>RECIPE BOOK </h1>
            <section>
                A service for you to store all of your favorite recipes
            </section>
            <section>
                <Login />
            </section>
        </div>
    );
}

export default Home;