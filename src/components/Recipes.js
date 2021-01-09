import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../axios/axiosWithAuth';
import RecipeCard from './RecipeCard';

function Recipes(props) {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axiosWithAuth().get('/users/users')
            .then(res => {
                console.log(res.data[0].recipes);
                setRecipes(res.data[0].recipes);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);    

    const onChange = (e) => {
        setSearch(e.target.value);
    }

    return(
        <>
        <h1>RECIPE PAGE</h1>
        <label>Search&nbsp;
            <input
                type="text"
                name="search"
                onChange={onChange}
            />
        </label>
        <div>
            {recipes 
                ? recipes
                    .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                    .map(recipe => <RecipeCard recipe={recipe} />)
                : <div>Fetching recipes...</div>
            }            
        </div>
        </>
    );
}

export default Recipes;