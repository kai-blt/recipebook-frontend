import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../axios/axiosWithAuth';
import * as yup from 'yup';
import schema from '../validation/schema';
import styled from 'styled-components';

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


const initialFormValues = {
    name: "(Enter Title)",
    type: "(Enter Type)",
    imageURL: "",
    ingredients: [{ quantity: "", measurement: "", name: "", group: "" }],
    steps: [{stepnumber: 1, instructions: ""}]
}

const initialErrors = {
    name: "",
    type: "",
    imageURL: "",
    quantity: "",
    ingredientname: "",
    measurement: "",
    group: "",
    instructions: ""
}

const AddRecipeForm = (props) => {
    const { isCreating, setIsCreating, setRecipes } = props;
    const [formValues, setFormValues] = useState(initialFormValues);
    const [errors, setErrors] = useState(initialErrors);
    const [enableSubmit, setEnableSubmit] = useState(true);


    useEffect(() => {
        schema.isValid(formValues)
            .then(valid => {
                console.log(valid);
                setEnableSubmit(!valid);
            });
    }, [formValues]);

    
    const handleSubmit = (e) => {
        e.preventDefault();   

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
        setFormValues(initialFormValues)
        setIsCreating();
    }

    const handleChange = (e, index) => {
        yup.reach(schema, e.target.name)
            .validate(e.target.value)
            .then(() => {
                setErrors({...errors, [e.target.name]: ""})
            })
            .catch(err => {
                setErrors({...errors, [e.target.name]: err.errors[0] })
            })

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
            case "group":
                const newGroup = [ ...formValues.ingredients ]
                newGroup[index].group = e.target.value;    
                setFormValues({ ...formValues, ingredients: newGroup });
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

    const addIngredient = (e, index) => {
        e.preventDefault();
        formValues.ingredients.splice(index + 1, 0, {quantity: "", measurement: "", name: "", ingredientgroup: ""});
        setFormValues({ ...formValues, formValues });
    }

    const delIngredient = (e, ingIndex) => {
        e.preventDefault();
        if (formValues.ingredients.length !== 1) {
            const newList = formValues.ingredients.filter((ing, index)=> index !== ingIndex);    
            setFormValues({ ...formValues, ingredients: newList });
        }
    }
    
    const addStep = (e, index) => {
        e.preventDefault();
        if (formValues.steps.length === 1) {
            formValues.steps.push({stepnumber: index + 2, instructions: ""});
            setFormValues({ ...formValues, formValues });
        } else {
            formValues.steps.splice(index, 0, {stepnumber: index + 2, instructions: ""});
            formValues.steps.map((step, index) => step.stepnumber = index + 1);
            setFormValues({ ...formValues, formValues });
        }
    }

    const delStep = (e, stepInstructions) => {
        e.preventDefault();
        if (formValues.steps.length !== 1) {
            const newList = formValues.steps.filter(stp => stp.instructions !== stepInstructions);  
            newList.map((step, index) => step.stepnumber = index + 1);
            setFormValues({ ...formValues, steps: newList });    
        }
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
                    {errors.name}
                    {errors.type}
                    {errors.imageURL}
                </ErrorMessages>
            </InfoBox>
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
                            <div>
                                <button className="deleteBtn2" onClick={e => delIngredient(e, index)}>-</button>
                            </div>
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
                            <div>
                                <button className="deleteBtn2" onClick={e => delStep(e, index)}>-</button>
                            </div>
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
            {enableSubmit ? <button className="disabled">Submit</button> :  <button className="addBtn" onClick={handleSubmit}>Submit</button>}
        </FormContainer>
    )
}

export default AddRecipeForm;

