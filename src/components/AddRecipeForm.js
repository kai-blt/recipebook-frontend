import React, { useState } from 'react';
import axiosWithAuth from '../axios/axiosWithAuth';
import styled from 'styled-components';


const FormContainer = styled.div`
    margin-bottom: 4%;
`;

const RecipeTitle = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-flow: row wrap;
    .edit {
        width: 20%;
    }

    @media (max-width: 1000px) {
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
    align-items: center;
    padding-bottom: 2%;

    .qty {
        width: 10%;
    }

    .msr {
        width: 15%;
    }

    .ing {
        width: 30%;
    }

    .grp {
        width: 20%;
    }

    .step {
        width: 85%;
    }

    .btns {
        width:  8%;
    }
`;


const initialFormValues = {
    name: "",
    type: "",
    imageURL: "",
    ingredients: [{ quantity: "", measurement: "", name: "", group: "" }],
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
            case "group":
                let group = "";
                (e.target.value === "") ? group = "Ingredient" : group = e.target.value;
                const newGroup = [ ...formValues.ingredients ]
                newGroup[index].group = group;    
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

    const addIngredient = () => {
        setFormValues({ ...formValues, ingredients: [...formValues.ingredients, {quantity: "", measurement: "", name: ""}] });
    }

    const delIngredient = (e, ingredientName) => {
        e.preventDefault();
        if (formValues.ingredients.length !== 1) {
            const newList = formValues.ingredients.filter(ing => ing.name !== ingredientName);    
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
                    <h2>{formValues.name}</h2>
                </div>
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
                        <div>
                            <button onClick={addIngredient}>+</button>
                            <button onClick={e => delIngredient(e, ing.name)}>-</button>
                        </div>
                    </IngredientFields>
                ))}
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
                        <div>
                            <button onClick={e => addStep(e, index)}>+</button>
                            <button onClick={e => delStep(e, stp.instructions)}>-</button>
                        </div>
                    </IngredientFields>
                ))}
            </InfoBox>        
        <button className="addBtn" onClick={handleSubmit}>Submit</button>
        </FormContainer>
    )
}

export default AddRecipeForm;

