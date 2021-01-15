import React from 'react';
import Login from './Login';

function Home(props) {
    const {setIsLoggedIn} = props;
    return(
        <div>            
            <div>
                <p>A service for you to store all of your favorite recipes</p>
            </div>
            <section>
                <Login setIsLoggedIn={setIsLoggedIn}/>
            </section>
        </div>
    );
}

export default Home;