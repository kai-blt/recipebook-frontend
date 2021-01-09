import React from 'react';
import styled from 'styled-components';

const RecipeCardContainer = styled.div`
    margin-bottom: 4%;
`;

function RecipeCard(props) {
    const { recipe } = props;

    return(
        <RecipeCardContainer>            
            <h2>{recipe.name}</h2>
            <h3>Ingredients</h3>
            <div>{recipe.ingredients.map(ing => <div>{ing.quantity} {ing.measurement} {ing.name}</div>)}</div>
            <h3>Steps</h3>
            <div>{recipe.steps.map(stp => <div>{stp.stepnumber}. {stp.instructions}</div>)}</div>
        </RecipeCardContainer>
    );
}

export default RecipeCard;