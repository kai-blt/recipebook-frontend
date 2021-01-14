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
    background: ${({background}) => background.match(/http/i) ? 'url(' + background + ')': '#555' };
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
    color: #fff;
    font-weight: 700;
    font-size: 2.5rem;
    text-shadow: 1px 1px 4px #000;
    transition: all 0.5s;
    &:hover {
        opacity: 0.2;
        transition: all 0.5s;
    }  

    @media(max-width: 1200px) {
        font-size: 4rem;
    }

    @media(max-width: 700px) {
        font-size: 2rem;
    }

    @media(max-width: 500px) {
        font-size: 1.5rem;
        padding-left: 10%;
    }
`;


function RecipeList(props) {
    const { recipe, onClick } = props;

    return(
        <RecipeListContainer>       
            <ImageContainer background={recipe.imageURL} onClick={onClick}>
                {recipe.name}
            </ImageContainer>
        </RecipeListContainer>
    );
}

export default RecipeList;