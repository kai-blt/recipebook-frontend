import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../axios/axiosWithAuth';
import RecipeList from './RecipeList';
import RecipeCard from './RecipeCard';
import styled from 'styled-components';

const RecipeContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;   
    align-items: flex-start;
    margin: 0;
    padding: 0; 
    width: 100%;
    height: 100vh;
    .search {
        margin-bottom: 6%;
    }
`;

const RecipeListPane = styled.div`
    width: 50%;
    height: 100vh;
    padding: 2%;
    border-right: 1px dashed #888;
`;

const RecipeDirectionsPane = styled.div`
    width: 50%;
    height: 100vh;
    padding: 2%;
`;


function Recipes(props) {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState('');


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

    const handleClick = (e) => {
        e.preventDefault();
        setClicked(e.target.innerHTML);
    }

    return(
        <>
        <h1>RECIPE BOOK</h1>
        <RecipeContainer>                         
            <RecipeListPane>
                <div className="search">
                    <label>Search&nbsp;
                        <input
                            type="text"
                            name="search"
                            onChange={onChange}
                        />
                    </label>
                </div>
                {recipes 
                    ? recipes
                        .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                        .map(recipe => <RecipeList recipe={recipe} onClick={handleClick}/>)
                    : <div>Fetching recipes...</div>
                }
            </RecipeListPane>  
            <RecipeDirectionsPane>
                {clicked
                    ? recipes
                        .filter(recipe => recipe.name.match(new RegExp(`${clicked}`, "i")))
                        .map(recipe => <RecipeCard recipe={recipe} />)
                    : null
                }     
            </RecipeDirectionsPane>       
        </RecipeContainer>
        </>
    );
}

export default Recipes;