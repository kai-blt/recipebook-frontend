import React from 'react';
import styled from 'styled-components';

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
    height: 20vh;
    background-image: url(${ ({background}) => background});
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
    color: #fff;
    font-weight: 700;
    font-size: 2.5rem;
    text-shadow: 1px 1px 4px #000;
    transition: all 0.5s;
    &:hover {
        height: 21vh;
        transition: all 0.5s;
    }
`;


function RecipeList(props) {
    const { recipe, onClick } = props;

    return(
        <RecipeListContainer>       
            <ImageContainer background={recipe.imageURL} onClick={onClick}>
                {recipe.name}
            </ImageContainer>
            {/* <img src={recipe.imageURL} alt={recipe.name}/> */}        
        </RecipeListContainer>
    );
}

export default RecipeList;