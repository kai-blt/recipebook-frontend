import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../axios/axiosWithAuth';
import RecipeList from './RecipeList';
import RecipeCard from './RecipeCard';
import { v4 as uuidv4 } from 'uuid';
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
`;

const SearchNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 6%;
    .add {
        width: 30%;
        button {
            margin-bottom: 2%;
        }
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
                <SearchNav>
                    <div>
                    <label>Search&nbsp;
                        <input
                            type="text"
                            name="search"
                            onChange={onChange}
                        />
                    </label>
                    </div>
                    <div className="add">
                        <button>New Recipe</button>
                    </div>
                </SearchNav>
                {recipes 
                    ? recipes
                        .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                        .map(recipe => <RecipeList key={uuidv4()} recipe={recipe} onClick={handleClick}/>)
                    : <div>Fetching recipes...</div>
                }
            </RecipeListPane>  
            <RecipeDirectionsPane>
                {clicked
                    ? recipes
                        .filter(recipe => recipe.name.match(new RegExp(`${clicked}`, "i")))
                        .map(recipe => <RecipeCard key={uuidv4()} recipe={recipe} setRecipes={setRecipes}/>)
                    : null
                }     
            </RecipeDirectionsPane>       
        </RecipeContainer>
        </>
    );
}

export default Recipes;