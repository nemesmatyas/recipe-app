import React, { useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/recipes-action';


const RecipeDetailScreen = props => {
    const availableRecipes = useSelector(state => state.recipes.recipes);
    const recipeID = props.navigation.getParam('recipeID');
    const currentRecipeIsFavorite= useSelector(state => state.recipes.favoriteRecipes.some(recipe => recipe.id === recipeID));
    const selectedRecipe = availableRecipes.find(recipe => recipe.id === recipeID);

    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(recipeID));
    }, [dispatch, recipeID]);

    useEffect(() => {
        props.navigation.setParams({
            toggleFav: toggleFavoriteHandler
        })
    }, [toggleFavoriteHandler]);

    useEffect(() => {
        props.navigation.setParams({
            isFav: currentRecipeIsFavorite
        })
    }, [currentRecipeIsFavorite])

    return(
        <ScrollView>
            <Image source={{uri: selectedRecipe.imageUrl}} style={styles.image} />
            <View style={styles.details}>
                <Text>{selectedRecipe.duration} mins</Text>
                <Text>{selectedRecipe.affordability.toUpperCase()}</Text>
                <Text>{selectedRecipe.complexity.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>INGREDIENTS</Text>
            {
                selectedRecipe.ingredients.map(ingredient => <View style={styles.listItem} key={ingredient}><Text >{ingredient}</Text></View>)
            }
            <Text style={styles.title}>Steps</Text>
            {
                selectedRecipe.steps.map(step => <View style={styles.listItem} key={step}><Text >{step}</Text></View>)
            }
            <FlashMessage position="top" />
        </ScrollView>
        
    )
}

RecipeDetailScreen.navigationOptions = navigationData => {
    const recipeTitle = navigationData.navigation.getParam('recipeTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: recipeTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="FAV" iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} onPress={() => {
                    toggleFavorite();
                    if (isFavorite) {
                        showMessage({
                            message: 'Removed from favorites',
                            type: 'danger'
                        });
                    } else {
                        showMessage({
                            message: 'Added to favorites!',
                            type: 'success'
                        });
                    }
                    
                }} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15
    },
    title: {
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5
    }
});

export default RecipeDetailScreen;