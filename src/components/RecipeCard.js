import React from 'react';
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

function RecipeCard(props) {
    const { recipe } = props;

    return(
        <RecipeCardContainer>            
            <h2>{recipe.name}</h2>
            <InfoBox>
                <img src={recipe.imageURL} alt={recipe.name}/>
                <h3>Ingredients</h3>
                {recipe.ingredients.map(ing => <div><strong>{ing.quantity} {ing.measurement}</strong> {ing.name}</div>)}
            </InfoBox>
            <InfoBox>
                <h3>Steps</h3>
                {recipe.steps.map(stp => <div><strong>{stp.stepnumber}.</strong> {stp.instructions}</div>)}
            </InfoBox>
        </RecipeCardContainer>
    );
}

export default RecipeCard;