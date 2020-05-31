import { RECIPES } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/recipes-action';

const INITIAL_STATE = {
    recipes: RECIPES,
    filteredRecipes: RECIPES,
    favoriteRecipes: []
}

const recipeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteRecipes.findIndex(recipe => recipe.id === action.recipeID);
            if (existingIndex >= 0) {
                const updatedFavRecipes = [...state.favoriteRecipes];
                updatedFavRecipes.splice(existingIndex, 1);
                return {
                    ...state,
                    favoriteRecipes: updatedFavRecipes
                }
            } else {
                return {
                    ...state,
                    favoriteRecipes: state.favoriteRecipes.concat(state.recipes.find(recipe => recipe.id === action.recipeID))
                }
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredRecipes = state.recipes.filter(recipe => {
                if (appliedFilters.glutenFree && !recipe.isGlutenFree) {
                    return false;
                }
                if (appliedFilters.lactoseFree && !recipe.isLactoseFree) {
                    return false;
                }
                if (appliedFilters.vegeterian && !recipe.isVegeterian) {
                    return false;
                }
                if (appliedFilters.vegan && !recipe.isVegan) {
                    return false;
                }
                return true;
            });
            return {
                ...state,
                filteredRecipes: updatedFilteredRecipes
            }
        default:
            return state;
    }
}

export default recipeReducer;