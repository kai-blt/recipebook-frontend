import React from 'react';
import styled from 'styled-components';

function RecipeThumbnailGrid(props) {
  const { recipe, onClick } = props;

  return(
    <RecipeListContainer >     
      <ImageContainer background={recipe.imageURL} onClick={onClick}>
        {recipe.name}
      </ImageContainer>
    </RecipeListContainer>
  );
}

//Component Styles
const RecipeListContainer = styled.div`
  margin-bottom: 8%;
  background-color: #eee;
  border-radius: 10px;
  padding: 2%;
  box-shadow: 4px 4px 10px #222;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  padding: 50%;
  width: 100%;
  background: ${({background}) => background.match(/http/i) ? 'url(' + background + ')': '#555' };
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  font-size: 3rem;
  line-height: 3.5rem;
  text-align: center;
  text-shadow: 4px 2px 4px #000;
  transition: all 0.5s;
  
  &:hover {
    opacity: 0.2;
    transition: all 0.5s;
  }  

  @media(max-width: 1200px) {
    font-size: 2rem;
  }

  @media(max-width: 700px) {
    font-size: 1.5rem;
  }

  @media(max-width: 500px) {
    font-size: 1rem;
  }
`;

export default RecipeThumbnailGrid;