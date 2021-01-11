import React, { useState } from 'react';
import axiosWithAuth from '../axios/axiosWithAuth';
import styled from 'styled-components';


const FormContainer = styled.div`
    width: 50%;
    margin: 0 2%;
`;

const RecipeTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;    
`;

const InfoBox = styled.div`
    margin: 3% 0;
    div {
        margin: 1% 1.5%;
    }
`;

const IngredientFields = styled.div`
    display: flex;
    justify-content: space-between;
`;

const initialFormValues = {
    name: "",
    type: "",
    imageURL: "",
    ingredients: [{ quantity: "", measurement: "", name: "" }],
    steps: [{stepnumber: 1, instructions: ""}]
}


const AddRecipeForm = (props) => {
    const { setIsCreating, setRecipes } = props;

    const [formValues, setFormValues] = useState(initialFormValues);

    const handleSubmit = (e) => {
        e.preventDefault();   
        console.log(formValues.imageURL)
        const newRecipe = {
            name: formValues.name,
            type: formValues.type,
            user: {
                    username: localStorage.getItem("username")
                },
            imageURL: formValues.imageURL,
            ingredients: formValues.ingredients,
            steps: formValues.steps
        } 
       
        axiosWithAuth().post('/recipes/recipe', newRecipe)
            .then(res => {
                console.log(res)
                axiosWithAuth().get('/users/getuserinfo')
                    .then(res => {
                        console.log(res.data.recipes);
                        setRecipes(res.data.recipes);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => console.log(err))  
        setIsCreating();
    }

    const handleChange = (e, index) => {
        switch(e.target.name) {
            case "ingredientname":
                const newIngName = [ ...formValues.ingredients ];
                newIngName[index].name = e.target.value;
                setFormValues({...formValues, ingredients: newIngName });
                break;
            case "quantity":
                const newIngQuantity = [ ...formValues.ingredients ]
                newIngQuantity[index].quantity = e.target.value;    
                setFormValues({ ...formValues, ingredients: newIngQuantity });
                break;
            case "measurement":
                const newIngMeasurement = [ ...formValues.ingredients ]
                newIngMeasurement[index].measurement = e.target.value;    
                setFormValues({ ...formValues, ingredients: newIngMeasurement });
                break;
            case "instructions":
                const newSteps = [ ...formValues.steps ]
                newSteps[index].instructions = e.target.value;                
                setFormValues({ ...formValues, steps: newSteps });
                break;
            default:
                setFormValues({ ...formValues, [e.target.name]: e.target.value });
                break;
        }
    }

    const addIngredient = () => {
        setFormValues({ ...formValues, ingredients: [...formValues.ingredients, {quantity: "", measurement: "", name: ""}] });
    }

    const delIngredient = (e, ingredientName) => {
        e.preventDefault();
        const newList = formValues.ingredients.filter(ing => ing.name !== ingredientName);    
        setFormValues({ ...formValues, ingredients: newList });
    }

    const addStep = (e, index) => {
        e.preventDefault();
        formValues.steps.splice(index, 0, {stepnumber: index + 2, instructions: ""});
        formValues.steps.map((step, index) => step.stepnumber = index + 1);
        setFormValues({ ...formValues, formValues });
    }

    const delStep = (e, stepInstructions) => {
        e.preventDefault();
        const newList = formValues.steps.filter(stp => stp.instructions !== stepInstructions);  
        newList.map((step, index) => step.stepnumber = index + 1);
        setFormValues({ ...formValues, steps: newList });       
    }

    return (
        <FormContainer>
              <RecipeTitle>
                <div>
                    <h2>{formValues.name}</h2>
                </div>
                <div>
                   <button onClick={handleSubmit}>Submit</button>
                </div>
            </RecipeTitle>
        <InfoBox>
            <label>Recipe Title
                <input 
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                />
            </label>  
            <label>Recipe Type
                <input 
                    type="text"
                    name="type"
                    value={formValues.type}
                    onChange={handleChange}
                />
            </label>  
            <label>New Image URL
                <input 
                    type="text"
                    name="imageURL"
                    value={formValues.imageURL}
                    onChange={handleChange}
                />
            </label>
            
            <h3>Ingredients</h3>
            {formValues.ingredients.map((ing, index) => (
                <IngredientFields>
                    <div>
                        <label>Quantity
                            <input 
                                type="text"
                                name="quantity"
                                value={formValues.ingredients[index].quantity}
                                onChange={e => handleChange(e, index)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Measurement
                            <input 
                                type="text"
                                name="measurement"
                                value={formValues.ingredients[index].measurement}
                                onChange={e => handleChange(e, index)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Ingredient
                            <input 
                                type="text"
                                name="ingredientname"
                                value={formValues.ingredients[index].name}
                                onChange={e => handleChange(e, index)}
                            />
                        </label>
                    </div>
                    <div>
                        <button onClick={addIngredient}>+</button>
                        <button onClick={e => delIngredient(e, ing.name)}>-</button>
                    </div>
                </IngredientFields>
            ))}
            <h3>Steps</h3>
            {formValues.steps.map((stp, index) => (
                <IngredientFields>
                    <div>
                        <label>Step {formValues.steps[index].stepnumber}
                            <input 
                                type="text"
                                name="instructions"
                                value={formValues.steps[index].instructions}
                                onChange={e => handleChange(e, index)}
                            />
                        </label>
                    </div>
                    <div>
                        <button onClick={e => addStep(e, index)}>+</button>
                        <button onClick={e => delStep(e, stp.instructions)}>-</button>
                    </div>
                </IngredientFields>
            ))}
        </InfoBox>
        </FormContainer>
    )
}

export default AddRecipeForm;

