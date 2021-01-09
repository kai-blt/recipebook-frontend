import React, { useState } from 'react';
import styled from 'styled-components';

const RecipeCardContainer = styled.div`
    margin-bottom: 4%;
`;

const InfoBox = styled.div`
    margin: 3% 0;
    div {
        margin: 1% 1.5%;
    }
`;

const RecipeTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .edit {
        width: 20%;
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
    ingredients: [],
    steps: []
}


function RecipeCard(props) {
    const { recipe } = props;
    const [formValues, setFormValues] = useState(initialFormValues);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
        setFormValues({
            name: recipe.name,
            type: recipe.type,
            imageURL: recipe.imageURL,
            ingredients: recipe.ingredients,
            steps: recipe.steps
        })
    }

    const addIngredient = () => {
        setFormValues({...formValues, ingredients: [...formValues.ingredients, {quantity: "", measurement: "", name: ""}]})
    }

    return(
        <RecipeCardContainer>            
            <RecipeTitle>
                <div>
                    <h2>{recipe.name}</h2>
                </div>
                <div className="edit">
                    {!isEditing
                        ? <button onClick={handleEdit}>Edit</button>
                        : <button onClick={handleEdit}>Submit</button>
                    }
                </div>
            </RecipeTitle>
            {!isEditing
                ? (
                    <>
                    <InfoBox>
                        <img src={recipe.imageURL} alt={recipe.name}/>   
                        <h3>Ingredients</h3>
                        {recipe.ingredients.map(ing => <div><strong>{ing.quantity} {ing.measurement}</strong> {ing.name}</div>)}
                    </InfoBox>
                    <InfoBox>
                        <h3>Steps</h3>
                        {recipe.steps.map(stp => <div><strong>{stp.stepnumber}.</strong> {stp.instructions}</div>)}
                    </InfoBox>
                    </>
                )
                : (
                    <>
                    <InfoBox>
                        <label>Recipe Title
                            <input 
                                type="text"
                                name="name"
                                value={formValues.name}
                            />
                        </label>  
                        <label>Recipe Type
                            <input 
                                type="text"
                                name="name"
                                value={formValues.type}
                            />
                        </label>  
                        <label>New Image URL
                            <input 
                                type="text"
                                name="imageURL"
                                value={formValues.imageURL}
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
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>Measurement
                                        <input 
                                            type="text"
                                            name="measurement"
                                            value={formValues.ingredients[index].measurement}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>Ingredient
                                        <input 
                                            type="text"
                                            name="name"
                                            value={formValues.ingredients[index].name}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <button onClick={addIngredient}>+</button>
                                    <button onClick={addIngredient}>-</button>
                                </div>
                            </IngredientFields>
                        ))}
                    </InfoBox>
                    <InfoBox>
                        <h3>Steps</h3>
                        {formValues.steps.map((ing,index) => (
                            <IngredientFields>
                                <div>
                                    <label>Step {formValues.steps[index].stepnumber}
                                        <input 
                                            type="text"
                                            name="instructions"
                                            value={formValues.steps[index].instructions}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <button onClick={addIngredient}>+</button>
                                    <button onClick={addIngredient}>-</button>
                                </div>
                            </IngredientFields>
                        ))}
                    </InfoBox>
                    </>
                )
            }
        </RecipeCardContainer>
    );
}

export default RecipeCard;