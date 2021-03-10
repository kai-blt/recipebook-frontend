import axiosWithAuth from '../../axios/axiosWithAuth';

/******************************************************
 * USER ACTION TYPES
 ******************************************************/
export const GET_RECIPE_START = 'GET_RECIPE_START';
export const GET_RECIPE_SUCCESS = 'GET_RECIPE_SUCCESS';
export const GET_RECIPE_FAIL = 'GET_RECIPE_FAIL';
export const GET_RECIPE_RESOLVE = 'GET_RECIPE_RESOLVE';

export const ADD_RECIPE_START = 'ADD_RECIPE_START';
export const ADD_RECIPE_SUCCESS = 'ADD_RECIPE_SUCCESS';
export const ADD_RECIPE_FAIL = 'ADD_RECIPE_FAIL';
export const ADD_RECIPE_RESOLVE = 'ADD_RECIPE_RESOLVE';

export const EDIT_RECIPE_START = 'EDIT_RECIPE_START';
export const EDIT_RECIPE_SUCCESS = 'EDIT_RECIPE_SUCCESS';
export const EDIT_RECIPE_FAIL = 'EDIT_RECIPE_FAIL';
export const EDIT_RECIPE_RESOLVE = 'EDIT_RECIPE_RESOLVE';



/******************************************************
 * USER ACTIONS
 ******************************************************/

export const recipeActions = {

  // GET RECIPES
  getRecipes: () => dispatch => {
    dispatch({ type: GET_RECIPE_START });

    axiosWithAuth().get('/users/getuserinfo')
      .then(res => {
        dispatch({ type: GET_RECIPE_SUCCESS, payload: res.data.recipes })
      })
      .catch(err => {
        dispatch({ type: GET_RECIPE_FAIL });
      })
      .finally(() => dispatch({ type: GET_RECIPE_RESOLVE }));
  },

  // ADD RECIPE
  addRecipe: (newRecipe) => dispatch => {
    dispatch({ type: ADD_RECIPE_START });

    axiosWithAuth()
    .post('/recipes/recipe', newRecipe)
    .then(res => {
      dispatch({ type: GET_RECIPE_START });
      recipeActions.getRecipes();
    })
    .catch(err => dispatch({ type: ADD_RECIPE_FAIL }))
    .finally(() => dispatch({ type: ADD_RECIPE_RESOLVE }));
  }, 

  // EDIT RECIPE
  editRecipe: (recipeId, updatedRecipe) => dispatch => {
    dispatch({ type: EDIT_RECIPE_START });

    axiosWithAuth()
      .put(`/recipes/recipe/${recipeId}`, updatedRecipe)
      .then(res => {
        dispatch({ type: EDIT_RECIPE_SUCCESS });
        recipeActions.getRecipes();
      })
      .catch(err => dispatch({ type: EDIT_RECIPE_FAIL }))
      .finally(() => dispatch({ type: EDIT_RECIPE_RESOLVE }));
  }, 

};

/******************************************************
 * USER INITIAL STATE
 ******************************************************/
export const recipeInitialState = {
  recipes: []
};

/******************************************************
 * USER REDUCER
 ******************************************************/
const recipeReducer = (state = recipeInitialState, action) => {
  switch (action.type) {

  // GET RECIPE
  case GET_RECIPE_START:
    return { ...state, status: 'get-recipe/pending' };
  case GET_RECIPE_SUCCESS:
    return {
    ...state,
    recipes: action.payload,
    status: 'get-recipe/success',
    error: ''
    };
  case GET_RECIPE_FAIL:
    return { ...state, status: 'get-recipe/error', error: action.payload };
  case GET_RECIPE_RESOLVE:
    return { ...state, status: 'idle' };

  // ADD RECIPE
  case ADD_RECIPE_START:
    return { ...state, status: 'add-recipe/pending' };
  case ADD_RECIPE_SUCCESS:
    return {
    ...state,
    status: 'add-recipe/success',
    error: ''
    };
  case ADD_RECIPE_FAIL:
    return { ...state, status: 'add-recipe/error', error: action.payload };
  case ADD_RECIPE_RESOLVE:
    return { ...state, status: 'idle' };

  // EDIT RECIPE
  case EDIT_RECIPE_START:
    return { ...state, status: 'edit-recipe/pending' };
  case EDIT_RECIPE_SUCCESS:
    return {
    ...state,
    status: 'edit-recipe/success',
    error: ''
    };
  case EDIT_RECIPE_FAIL:
    return { ...state, status: 'edit-recipe/error', error: action.payload };
  case EDIT_RECIPE_RESOLVE:
    return { ...state, status: 'idle' };

  // DEFAULT
  default:
    return state;
  }
};

export default recipeReducer;
