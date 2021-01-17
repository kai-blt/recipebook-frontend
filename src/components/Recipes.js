import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../axios/axiosWithAuth';
import RecipeThumbnail from './RecipeThumbnail';
import RecipeCard from './RecipeCard';
import { v4 as uuidv4 } from 'uuid';
import spinner from '../assets/spinner.gif'
import styled from 'styled-components';
import AddRecipeForm from './AddRecipeForm';




const RecipeContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;   
    align-items: flex-start;
    width: 100%;
    border-radius: 10px;
    background: #222;
    box-shadow: inset 4px 4px 10px #111;
   

    .desktoptoggle {
        display: initial;
    }
    .mobiletoggle {
        display: none;
    }

    @media (max-width: 600px) {
        .desktoptoggle {
            display: none;
        }
        .mobiletoggle {
            display: initial;
        }
    }
`;

const SearchNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-flow: row wrap;
    margin-bottom: 6%;

    button {
        margin-bottom: 0;
    }
    
    div {
        width: 40%;
    }

    @media (max-width: 600px) {
        div {
            width: 100%;
        }
    }
`;    

const RadioToggle = styled.div`
    display: inline-flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    margin-top: 1%;
    margin-bottom: 4%;
    input, label {
        margin-right: 2px;
        width: 20px;
    }
`;

const RecipeListPane = styled.div`
    width: 50%;
    padding-top: 4%;
    padding-left: 8%;
    padding-right: 8%;
    padding-bottom: 50%;
    padding-bottom: 50%;

    @media (max-width: 600px) {
      width: 100%;
    }
`;

const RecipeDirectionsPane = styled.div`
    width: 50%;
    padding-top: 4%;
    padding-left: 8%;
    padding-right: 8%;
    padding-bottom: 50%;
    border-left: 1px dashed #888;
    @media (max-width: 600px) {
      width: 0;
    }
`;

const ButtonContainer = styled.div`
    display: flex;   
    justify-content: space-between;
    div {
        width: 45%;
    } 
`;

const Spinner = styled.img`
    width: 10%;
`;



function Recipes(props) {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const [searchToggle, setSearchToggle] = useState(true);

    useEffect(() => {
        axiosWithAuth().get('/users/getuserinfo')
            .then(res => {
                setRecipes(res.data.recipes);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);       
   

    const onChange = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    const handleClick = (e) => {
        e.preventDefault();
        setClicked(e.target.innerHTML);
        setIsViewing(!isViewing);
    }

    const handleBack = (e) => {
        e.preventDefault();
        setIsViewing(false);
        setIsCreating(false);
    }

    const createNewRecipe = (e) => {
        e.preventDefault();
        setIsCreating(!isCreating);
    }

    return(
            <RecipeContainer>                         
                <RecipeListPane  className="desktoptoggle">
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
                    <RadioToggle>
                        <div>
                            <label>
                                <input type="radio" checked={!searchToggle} onChange={() => setSearchToggle(!searchToggle)}></input>
                                Ingredient
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="radio" checked={searchToggle} onChange={() => setSearchToggle(!searchToggle)}></input>
                                Title
                            </label>
                        </div>
                    </RadioToggle>
                    { searchToggle
                        ? recipes 
                          ? recipes
                              .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                              .map(recipe => <RecipeThumbnail key={uuidv4()} recipe={recipe} onClick={handleClick}/>) 
                          : <div><Spinner src={spinner} alt="spinner"/></div>
                        : recipes 
                            ? recipes
                                .filter(recipe => recipe.ingredients.some(ing => ing.name.match(new RegExp(`${search}`, "i"))))
                                .map(recipe => <RecipeThumbnail key={uuidv4()} recipe={recipe} onClick={handleClick}/>) 
                            : <div><Spinner src={spinner} alt="spinner"/></div>
                    }
                </RecipeListPane>
                <RecipeListPane  className="mobiletoggle">
                    <SearchNav>
                        <div>
                        <label>Search&nbsp;
                            <input
                                type="text"
                                name="search"
                                onChange={onChange}
                            />
                        </label>
                        <RadioToggle>
                            <div>
                                <label>
                                    <input type="radio" checked={!searchToggle} onChange={() => setSearchToggle(!searchToggle)}></input>
                                    Ingredient
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" checked={searchToggle} onChange={() => setSearchToggle(!searchToggle)}></input>
                                    Title
                                </label>
                            </div>
                        </RadioToggle>
                        </div>
                        <ButtonContainer>
                            <div>
                                <button onClick={handleBack}>Back to List</button>
                            </div>
                            <div>
                                <button onClick={createNewRecipe}>New Recipe</button>
                            </div>
                        </ButtonContainer>
                    </SearchNav>
                    
                    {isCreating
                        ? <AddRecipeForm setIsCreating={setIsCreating} setRecipes={setRecipes}/>
                        : isViewing
                            ? clicked
                                ? recipes
                                    .filter(recipe => recipe.name.match(new RegExp(`${clicked}`, "i")))
                                    .map(recipe => <RecipeCard key={uuidv4()} recipe={recipe} setRecipes={setRecipes} setClicked={setClicked} />)
                                :  null
                            : searchToggle
                                ? recipes 
                                    ? recipes
                                        .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                                        .map(recipe => <RecipeThumbnail key={uuidv4()} recipe={recipe} onClick={handleClick}/>) 
                                    : <div><Spinner src={spinner} alt="spinner"/></div>
                                : recipes 
                                    ? recipes
                                        .filter(recipe => recipe.ingredients.some(ing => ing.name.match(new RegExp(`${search}`, "i"))))
                                        .map(recipe => <RecipeThumbnail key={uuidv4()} recipe={recipe} onClick={handleClick}/>) 
                                    : <div><Spinner src={spinner} alt="spinner"/></div>
                    }
                </RecipeListPane>
                {isCreating
                    ?
                        <RecipeDirectionsPane  className="desktoptoggle">
                            <AddRecipeForm setIsCreating={setIsCreating} setRecipes={setRecipes}/>
                        </RecipeDirectionsPane>
                    : 
                        <RecipeDirectionsPane  className="desktoptoggle">
                            {clicked
                                ? recipes
                                    .filter(recipe => recipe.name.match(new RegExp(`${clicked}`, "i")))
                                    .map(recipe => <RecipeCard key={uuidv4()} recipe={recipe} setRecipes={setRecipes} setClicked={setClicked} />)
                                : null
                            }     
                        </RecipeDirectionsPane>                
                }                 
            </RecipeContainer>
    );
}

export default Recipes;