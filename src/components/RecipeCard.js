import React, { useState, useEffect } from 'react';
import  { v4 as uuidv4 } from "uuid";
import IngredientList from './IngredientList';
import * as yup from 'yup';
import schema from '../validation/schema';
import axiosWithAuth from '../axios/axiosWithAuth';
import styled from 'styled-components';

const RecipeCardContainer = styled.div`
    margin-bottom: 4%;
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


const initialFormValues = {
    name: "",
    type: "",
    imageURL: "",
    ingredients: [{ quantity: "", measurement: "", name: "", group: "" }],
    steps: [{stepnumber: 1, instructions: ""}]
}


function RecipeCard(props) {
    const { recipe, setRecipes, setClicked } = props;
    const [formValues, setFormValues] = useState(initialFormValues);
    const [isEditing, setIsEditing] = useState(false);
    const [enableSubmit, setEnableSubmit] = useState(true);
    const [errors, setErrors] = useState(true);
    const [groups, setGroups] = useState(Array.from(new Set(recipe.ingredients.map(ing => ing.ingredientgroup))))
    
    useEffect(() => {
        schema.isValid(formValues).then(valid => {
            setEnableSubmit(!valid);
        });
    }, [formValues]);

    useEffect(() => {
       setGroups((Array.from(new Set(recipe.ingredients.map(ing => ing.ingredientgroup)))).sort());
    }, []);
    
    //Edit Handler
    const handleEdit = (e) => {
        e.preventDefault();   
        setIsEditing(!isEditing);
        setFormValues({ ...formValues, ...recipe })
    }

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
        })
             
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
       
        axiosWithAuth().put(`/recipes/recipe/${recipe.recipeid}`, newRecipe)
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
        setClicked(formValues.name);
        setIsEditing(!isEditing);
    }

    //Change Handler
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
                const newGroup = [ ...formValues.ingredients ]
                newGroup[index].ingredientgroup = e.target.value;    
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

   
    //Button Handlers
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
        formValues.steps.splice(index + 1, 0, {stepnumber: index + 1, instructions: ""});
        formValues.steps.map((step, index) => step.stepnumber = index + 1);
        setFormValues({ ...formValues, formValues });
    }

    const delStep = (e, stpIndex) => {
        e.preventDefault();
        if (formValues.steps.length !== 1) {
            const newList = formValues.steps.filter((stp, index) => index !== stpIndex);  
            newList.map((step, index) => step.stepnumber = index + 1);
            setFormValues({ ...formValues, steps: newList });    
        }
    }

    const deleteRecipe = (e) => {
        e.preventDefault();
        axiosWithAuth().delete(`/recipes/recipe/${recipe.recipeid}`)
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
    }


    return(
        <RecipeCardContainer>            
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
            {!isEditing
                ? (
                    <>
                    <ImageContainer background={recipe.imageURL}/>
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
                                    {formValues.ingredients.length == 1
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
                                    {formValues.steps.length == 1
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
        </RecipeCardContainer>
    );
}

export default RecipeCard;