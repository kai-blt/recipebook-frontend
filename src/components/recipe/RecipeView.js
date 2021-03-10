import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recipeActions } from '../../state/ducks';

import RecipeThumbnail from './RecipeThumbnail';
import RecipeCard from './RecipeCard';
import AddRecipeForm from './AddRecipeForm';
import { v4 as uuidv4 } from 'uuid';
import spinner from '../../assets/spinner.gif'
import styled from 'styled-components';


function RecipeView(props) {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [searchToggle, setSearchToggle] = useState(true);

  //Redux State Managers
  const dispatch = useDispatch();
  const { recipes, status } = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(recipeActions.getRecipes());
  }, [dispatch]);     

  
  switch(status) {
    case "add-recipe/success":
      dispatch(recipeActions.getRecipes());
    case "delete-recipe/success":
      dispatch(recipeActions.getRecipes());
    case "edit-recipe/success":
      dispatch(recipeActions.getRecipes());
  }
  

  const onChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  }

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(e.target.innerHTML);
    setIsViewing(!isViewing);
    // Scroll to top for Safari
    document.body.scrollTop = 0;
    // Scroll to top for Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0;
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

        {/* Desktop Recipe List View */}
        <RecipeListPane className="desktoptoggle">
          <SearchNav>
            <div>
              <label>Search&nbsp;
                <input
                  type="text"
                  name="search"
                  value={search}
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

        {/* Desktop Create Recipe OR Recipe Details View */}
        {isCreating
          ?
            <RecipeDirectionsPane  className="desktoptoggle">
              <AddRecipeForm setIsCreating={createNewRecipe} setClicked={setClicked}/>
            </RecipeDirectionsPane>
          : 
            <RecipeDirectionsPane  className="desktoptoggle">
              {clicked
                ? recipes
                  .filter(recipe => recipe.name.match(new RegExp(`^${clicked}$`, "i")))
                  .map(recipe => <RecipeCard key={uuidv4()} recipe={recipe} setClicked={setClicked} />)
                : null
              }   
            </RecipeDirectionsPane>        
        }    

        {/* Mobile Recipe List View */}
        <RecipeListPane  className="mobiletoggle">
          <SearchNav>            
            <ButtonContainer>
              {isViewing 
                ? 
                <div>
                  <button onClick={handleBack}>Back</button>
                </div>
                :
                isCreating 
                  ?
                  null
                  :
                  <div>
                    <button onClick={createNewRecipe}>New Recipe</button>
                  </div>
                
              }
            </ButtonContainer>
            <div>
            {isViewing || isCreating
              ?
                null
              :
                <>
                <label>Search&nbsp;
                  <input
                    type="text"
                    name="search"
                    value={search}
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
                </>
            }
            </div>
          </SearchNav>  

          {/* Mobile Recipe Creation View */}          
          {isCreating
            ? <AddRecipeForm setIsCreating={createNewRecipe} setClicked={setClicked}/>
            : isViewing
              ? clicked
                ? recipes
                  .filter(recipe => recipe.name.match(new RegExp(`^${clicked}$`, "i")))
                  .map(recipe => <RecipeCard key={uuidv4()} recipe={recipe} setClicked={setClicked} />)
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
      </RecipeContainer>
  );
};


//Component Styles
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
  border-right: 1px dashed #888;
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
  /* border-left: 1px dashed #888; */
  @media (max-width: 600px) {
    width: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;   
  justify-content: space-between;
  margin-bottom: 4%;
`;

const Spinner = styled.img`
  width: 10%;
`;

export default RecipeView;