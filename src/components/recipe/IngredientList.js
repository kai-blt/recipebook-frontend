import React from 'react';
import styled from 'styled-components';


function IngredientList(props) {
  const {ingredients, group} = props;  
  
  return (
    <IngredientContainer>
      {/* If there is a recipe group, display a title for it*/}
      { group === "" || group === null 
        ? null 
        : <h4>{`${group}`}</h4>
      }
     
      {ingredients.map((ing, index) => ing.ingredientgroup === group
          ? 
           (<div key={ing.name + index}>
              <strong>{ing.quantity !== "" ? ing.quantity : null} {ing.measurement}</strong> {ing.name}
            </div>)
          : null)
      }
    </IngredientContainer>
  )
};

//Component Styles
const IngredientContainer = styled.div`
  margin-bottom: 6%;
  div {
    margin-left: 6%;
  };

  @media (min-width: 1600px) {
    margin-bottom: 10%;
    div {
      margin-left: 4%;
      line-height: 3rem;
    }
  };
`;

export default IngredientList;