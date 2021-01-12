import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../axios/axiosWithAuth';
import RecipeList from './RecipeList';
import RecipeCard from './RecipeCard';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import AddRecipeForm from './AddRecipeForm';

const RecipeContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;   
    align-items: flex-start;
    margin: 0;
    padding: 0; 
    width: 100%;
    height: 400%;
    border-radius: 10px;
    background: #222;
    box-shadow: inset 4px 4px 10px #111;
`;

const SearchNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-flow: row wrap;
    margin-bottom: 6%;
    
    div {
        width: 40%;
    }

    @media (max-width: 600px) {
        div {
            width: 100%;
        }
    }
`;    

const RecipeListPane = styled.div`
    width: 50%;
    height: 100vh;
    padding-top: 4%;
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 50%;
    padding-bottom: 50%;
`;

const RecipeDirectionsPane = styled.div`
    width: 50%;
    height: 100%;
    padding-top: 4%;
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 50%;
    border-left: 1px dashed #888;
`;


function Recipes(props) {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState('');
    const [isCreating, setIsCreating] = useState(false);


    useEffect(() => {
        axiosWithAuth().get('/users/getuserinfo')
            .then(res => {
                console.log(res.data.recipes);
                setRecipes(res.data.recipes);
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

    const createNewRecipe = (e) => {
        e.preventDefault();
        setIsCreating(!isCreating);
    }

    return(
        <>
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
                        <button onClick={createNewRecipe}>New Recipe</button>
                    </div>
                </SearchNav>
                {recipes 
                    ? recipes
                        .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                        .map(recipe => <RecipeList key={uuidv4()} recipe={recipe} onClick={handleClick}/>)
                    : <div>Fetching recipes...</div>
                }
            </RecipeListPane>

            {isCreating
                ?
                   <AddRecipeForm setIsCreating={setIsCreating} setRecipes={setRecipes}/>
                : 
                    <RecipeDirectionsPane>
                        {clicked
                            ? recipes
                                .filter(recipe => recipe.name.match(new RegExp(`${clicked}`, "i")))
                                .map(recipe => <RecipeCard key={uuidv4()} recipe={recipe} setRecipes={setRecipes} setClicked={setClicked} />)
                            : null
                        }     
                    </RecipeDirectionsPane>
                
            }    
        </RecipeContainer>
        </>
    );
}

export default Recipes;