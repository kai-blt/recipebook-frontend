import React, { useState, useEffect, useRef } from 'react';
import  { v4 as uuidv4 } from "uuid";
import * as yup from 'yup';
import schema from '../validation/schema';
import axiosWithAuth from '../axios/axiosWithAuth';
import gsap from 'gsap';
import placeholder from '../assets/placeholder.jpg'
import styled from 'styled-components';

const RecipeCardContainer = styled.div`
    margin-bottom: 4%;
`;

const InfoBox = styled.div`
    margin: 10% 0;
   
`;

const ImageContainer = styled.div`
    height: 30vh;
    background: ${({background}) => background.match(/http/i) ? 'url(' + background + ')': '#555' };
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 6%;
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
`;

const FieldsButtonContainer = styled.div`  
     display: flex;
     justify-content: space-between;
     margin-top: 2%;
     div {
         width: 40%;
     }
`;

const StepContainer = styled.div`
    display: flex;
    padding: 2%;
    div {
        padding-right: 2%;
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

    //Animation Ref
    const animationRef = useRef(null);

    useEffect(() => {
        gsap.from(animationRef.current, {
            autoAlpha: 0,
            duration: 1.25,
            ease: 'power4.inOut'
        })
    }, [isEditing]);

    
    useEffect(() => {
        schema.isValid(formValues).then(valid => {
            setEnableSubmit(!valid);
        });
    }, [formValues]);

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

   
    //Button Handlers
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
        <RecipeCardContainer ref={animationRef}>            
            <RecipeTitle>
                <div>
                    <h2>{recipe.name}</h2>
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
                    <InfoBox>
                        {recipe.imageURL.match(/http/i) ? <ImageContainer background={recipe.imageURL} /> : null } 
                        <h3>Ingredients</h3>
                        {recipe.ingredients.map(ing => <div key={uuidv4()}><strong>{ing.quantity} {ing.measurement}</strong> {ing.name}</div>)}
                    </InfoBox>
                    <InfoBox>
                        <h3>Steps</h3>
                        {recipe.steps.map(stp => <StepContainer key={uuidv4()}><div><strong>{stp.stepnumber}.</strong></div><div> {stp.instructions}</div></StepContainer>)}
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
                                            value={formValues.ingredients[index].group}
                                            onChange={e => handleChange(e, index)}
                                        />
                                    </label>
                                </div> 
                                <FieldsButtonContainer className="btns">
                                    <div>
                                        <button className="deleteBtn2" onClick={e => delIngredient(e, ing.name)}>-</button>
                                    </div>
                                    <div>
                                        <button onClick={addIngredient}>+</button>
                                    </div>
                                </FieldsButtonContainer>                               
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
                                <FieldsButtonContainer className="btns">
                                    <div>
                                        <button className="deleteBtn2" onClick={e => delStep(e, stp.instructions)}>-</button>
                                    </div>
                                    <div>
                                        <button onClick={e => addStep(e, index)}>+</button>
                                    </div>
                                </FieldsButtonContainer>
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