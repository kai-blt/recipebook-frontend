import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recipeActions } from '../../state/ducks';
import { useFormHelpers } from '../utils/useFormHelpers';

import schema from '../../validation/schema';
import styled from 'styled-components';

const AddRecipeForm = (props) => {
  const { setIsCreating, setClicked } = props;
  const [enableSubmit, setEnableSubmit] = useState(true);

  //Form Helper Utils
  const { 
    initialFormValues,
    errors,
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
    schema.isValid(formValues)
      .then(valid => {
        setEnableSubmit(!valid);
      });
  }, [formValues]); 

  
  const handleSubmit = (e) => {
    e.preventDefault();   

    //Create new recipe object
    const { name, type, imageURL, ingredients, steps } = formValues;
    const newRecipe = {
      name,
      type,
      user: {
          username: localStorage.getItem("username")
        },
      imageURL,
      ingredients,
      steps
    };

    //Dispatch action to add recipe
    dispatch(recipeActions.addRecipe(newRecipe));   
    
    //Reinitialize form state
    setFormValues(initialFormValues);
    setClicked(name);
    setIsCreating(e);

    // Scroll to top for Safari
    document.body.scrollTop = 0;
    // Scroll to top for Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0;
  }

  

  return (
    <FormContainer>
      <RecipeTitle>
        <div>
          <h2>{formValues.name || <br/>}</h2>
          <h4>{formValues.type || <br/>}</h4>          
        </div>
        <button className="cancelBtn" onClick={setIsCreating}>Cancel</button>
      </RecipeTitle>

      {/* Recipe Title/Image Form Fields */}
      <InfoBox>
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
        </EditInfoBox>             
        <label>Image URL
          <input 
            type="text"
            name="imageURL"
            value={formValues.imageURL}
            onChange={handleChange}
          />
        </label>
        <ErrorMessages>
          <div>{errors.name}</div>
          <div>{errors.type}</div>
          <div>{errors.imageURL}</div>
        </ErrorMessages>
      </InfoBox>

      {/* Ingredient Form Fields */}
      <InfoBox>
        <h3>Ingredients</h3>
        {formValues.ingredients.map((ing, index) => (
          <IngredientFields>
            <div className="qty">
              <label>Qty
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
                  value={formValues.ingredients[index].group}
                  onChange={e => handleChange(e, index)}
                />
              </label>
            </div> 
            <ButtonContainer>
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
        ))}
        <ErrorMessages>
          {errors.quantity}
          {errors.measurement}
          {errors.ingredientname}
          {errors.group}
        </ErrorMessages>
      </InfoBox>

      {/* Step Form Fields */}
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
            <ButtonContainer>
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
      <ErrorMessages>
        {errors.instructions}
      </ErrorMessages>
      {enableSubmit ? <button className="disabled">Submit</button> :  <button className="addBtn" onClick={e => handleSubmit(e)}>Submit</button>}
    </FormContainer>
  )
}

//Component Styles
const FormContainer = styled.div`
  margin-bottom: 4%;
`;

const RecipeTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-flow: column wrap;
  .edit {
    width: 100%;
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

const InfoBox = styled.div`
  margin: 10% 0;
`;


const EditInfoBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  .title {
    width: 65%;
  }

  .type {
    width: 30%;
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

   div {
     width: 20%;
   }
`;

const ErrorMessages = styled.div`
  color: #d9534f;
`;

export default AddRecipeForm;

