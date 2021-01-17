import React from 'react';
import  { v4 as uuidv4 } from "uuid";
import styled from 'styled-components';

const IngredientContainer = styled.div`
    margin-bottom: 6%;
    div {
        margin-left: 6%;
    }
`;


function IngredientList(props) {
    const {ingredients, group} = props;    
    
    return (
        <IngredientContainer>
        {group === "" || group === null ? null : <h4>{`${group}`}</h4>}
        {ingredients.map(ing => ing.ingredientgroup === group ? <div key={uuidv4()}><strong>{ing.quantity > 0 ? ing.quantity : null} {ing.measurement}</strong> {ing.name}</div> : null)}
        </IngredientContainer>
    )
}

export default IngredientList;