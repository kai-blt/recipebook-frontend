import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recipeActions } from '../../state/ducks';
import IngredientList from './IngredientList';
import { useFormHelpers } from '../utils/useFormHelpers';


import  { v4 as uuidv4 } from "uuid";
import * as yup from 'yup';
import schema from '../../validation/schema';
import styled from 'styled-components';


function RecipeCard(props) {
  const { recipe, setClicked, recipeExpanded } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(true);
  const [groups, setGroups] = useState(Array.from(new Set(recipe.ingredients.map(ing => ing.ingredientgroup))));

  //Form Helper Utils
  const { 
    initialFormValues,
    errors,
    setErrors,
    formValues,
    setFormValues,
    addIngredient,
    delIngredient,
    addStep,
    delStep,
    handleChange
  } = useFormHelpers();


  //Redux State Managers
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.recipes);
  
  useEffect(() => {
    schema.isValid(formValues).then(valid => {
      setEnableSubmit(!valid);
    });
  }, [formValues]);

  useEffect(() => {
     setGroups((Array.from(new Set(recipe.ingredients.map(ing => ing.ingredientgroup)))).sort());
  }, [recipe.ingredients]);
  
  //Edit Handler
  const handleEdit = (e) => {
    e.preventDefault();   
    setIsEditing(!isEditing);
    setFormValues({ ...formValues, ...recipe });
  };

  //Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();   

    yup.reach(schema, e.target.name)
    .validate(e.target.value)
    .then(() => { 
      setErrors({...errors, [e.target.name]: ""})
    })
    .catch(err => {
      setErrors({...errors, [e.target.name]: err.errors[0] })
    });
       
    //Create New Recipe Object
    const { name, type, imageURL, ingredients, steps } = formValues;
    const updatedRecipe = {
      name,
      type,
      user: {
          username: localStorage.getItem("username")
        },
      imageURL,
      ingredients,
      steps
    };

    //Dispatch action to edit/update recipe
    dispatch(recipeActions.editRecipe(recipe.recipeid, updatedRecipe));

    if (status === "edit-recipe/success") {        
      //Reinitialize form state
      setFormValues(initialFormValues);
      setClicked(name);
      setIsEditing(!isEditing);      
    };

    // Scroll to top for Safari
    document.body.scrollTop = 0;
    // Scroll to top for Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0; 
  };


  const deleteRecipe = (e) => {
    e.preventDefault();

    dispatch(recipeActions.deleteRecipe(recipe.recipeid));    
    
    // Scroll to top for Safari
    document.body.scrollTop = 0;
    // Scroll to top for Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0;  
  }


  return(
    <RecipeCardContainer>  
      
      {/* Recipe Title Information */}          
      <RecipeTitle>
        <div>
          <h2>{recipe.name}</h2>
          {recipe.type ? <h4>{recipe.type}</h4> : null}
        </div>
        <div className="edit">
          {!isEditing
            ? <button className="editBtn" onClick={handleEdit}>Edit</button>
            : <button className="cancelBtn" onClick={handleEdit}>Cancel</button>
          }
        </div>        
      </RecipeTitle>

      {/* Show Recipe Info (Ingredients & Steps) OR Edit form if editing */}
      {!isEditing
        ? (
          <>
            {/* If recipe expanded view, don't show image here */}
            {!recipeExpanded && <ImageContainer background={recipe.imageURL}/>}
            <InfoBox>
              <h3>Ingredients</h3>            
              {groups.map(grp => <IngredientList group={grp} ingredients={recipe.ingredients} /> )}
            </InfoBox>
            <InfoBox>
              <h3>Steps</h3>
              {recipe.steps.map(stp => <StepContainer key={uuidv4()}><div><strong>{stp.stepnumber}.</strong></div><div>{stp.instructions}</div></StepContainer>)}
            </InfoBox>
          </>
        )
        : (
          <>
            {/* Recipe Title Forms */}
            <EditInfoBox>
              <div className="title">
                <label>Title
                  <input 
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                </label>  
              </div>
              <div className="type">
                <label>Type
                  <input 
                    type="text"
                    name="type"
                    value={formValues.type}
                    onChange={handleChange}
                  />
                </label>  
              </div>
              <div>
                <label>Image URL
                  <input 
                    type="text"
                    name="imageURL"
                    value={formValues.imageURL}
                    onChange={handleChange}
                  />
                </label>
              </div> 
            </EditInfoBox>     

            {/* Ingredients Forms */}
            <InfoBox>
            <h3>Ingredients</h3>
            {formValues.ingredients.map((ing, index) => (
              <>
              <IngredientFields>
                <div className="qty">
                  <label>Qty<br/>
                    <input 
                      type="text"
                      name="quantity"
                      value={formValues.ingredients[index].quantity}
                      onChange={e => handleChange(e, index)}                      
                    />
                    </label>
                </div>
                <div className="msr">
                  <label>Measure
                    <input 
                      type="text"
                      name="measurement"
                      value={formValues.ingredients[index].measurement}
                      onChange={e => handleChange(e, index)}
                    />
                  </label>
                </div>
                <div className="ing">
                  <label>Ingredient
                    <input 
                      type="text"
                      name="ingredientname"
                      value={formValues.ingredients[index].name}
                      onChange={e => handleChange(e, index)}
                    />
                  </label>
                </div>       
                <div className="grp">
                  <label>Group
                    <input 
                      type="text"
                      name="group"
                      value={formValues.ingredients[index].ingredientgroup}
                      onChange={e => handleChange(e, index)}
                    />
                  </label>
                </div> 
                <ButtonContainer className="btns">
                  {formValues.ingredients.length === 1
                  ?
                    <div></div>
                  :
                    <div>
                      <button className="deleteBtn2" onClick={e => delIngredient(e, index)}>-</button>
                    </div>
                  }
                  <div>
                    <button className="addBtn" onClick={e => addIngredient(e, index)}>+</button>
                  </div>
                </ButtonContainer>                 
              </IngredientFields>
              </>
            ))}
            </InfoBox>

            {/* Step Forms */}
            <InfoBox>
            <h3>Steps</h3>
            {formValues.steps.map((stp, index) => (
              <IngredientFields>
                <div className="step">
                  <label>Step {formValues.steps[index].stepnumber}
                    <input 
                      type="text"
                      name="instructions"
                      value={formValues.steps[index].instructions}
                      onChange={e => handleChange(e, index)}
                    />
                  </label>
                </div>
                <ButtonContainer className="btns">
                  {formValues.steps.length === 1
                  ?
                    <div></div>
                  :
                    <div>
                      <button className="deleteBtn2" onClick={e => delStep(e, index)}>-</button>
                    </div>
                  }
                  <div>
                    <button className="addBtn" onClick={e => addStep(e, index)}>+</button>
                  </div>
                </ButtonContainer>
              </IngredientFields>
            ))}
            </InfoBox>
            <ButtonContainer>
              <button className="deleteBtn" onClick={deleteRecipe}>Delete</button>
              {enableSubmit ? <button className="disabled">Submit</button> :  <button className="submitBtn" onClick={handleSubmit}>Submit</button>}
            </ButtonContainer>
          </>
        )
      }
      <div>
        {recipeExpanded && <ImageContainer background={recipe.imageURL}/>}
      </div>
    </RecipeCardContainer>
  );
}

//Component Styles
const RecipeCardContainer = styled.div`
  margin-bottom: 4%;
  animation: fade-in 0.5s ease-in-out forwards;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const InfoBox = styled.div`
  margin: 10% 0; 

  .group {
    color: red;
    font-size: 1rem;
  }
`;

const ImageContainer = styled.div`
  height: 30vh;
  background: ${({background}) => background.match(/http/i) ? 'url(' + background + ')': '#555' };
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  color: #fff;
  margin: 6% 0;
  @media (max-width: 1000px) {
    height: 20vh;
  }
`;


const EditInfoBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  div {
    width: 100%;
  }

  .title {
    width: 65%;
  }

  .type {
    width: 30%;
  }
`;


const RecipeTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-flow: column wrap;
  
  div{
    margin: 0;
    /* border: 2px solid red; */
  }
  
  .edit {
    width: 100%;    
    .editBtn, .cancelBtn {
      margin: 0.5% 0;
    }
  }

  h2 {
    margin: 0;
    padding: 0;
  }

  h4 {
    font-weight: 500;
  }

  @media (max-width: 1200px) {
    .edit {
      width: 100%;
    }
  }
`;

const IngredientFields = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: column wrap;
  align-items: center;
  padding-bottom: 15%;

  div {
    width: 100%;
  }
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  margin-top: 2%;
  background: 1px solid red;

  div {
    width: 20%;
  }
`;


const StepContainer = styled.div`
  display: flex;
  line-height: 2.25rem;
  margin-bottom: 2.5%;
  margin-left: 6%;
  div {
    margin-right: 2%;
  }

  @media (max-width: 500px) {
    margin-bottom: 6%;
  }
`;

export default RecipeCard;