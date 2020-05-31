import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import RecipeList from '../components/RecipeList';

import { useSelector } from 'react-redux';

const CategoryRecipesScreen = props => {
    const catID = props.navigation.getParam('categoryID');

    const availableRecipes = useSelector(state => state.recipes.filteredRecipes);

    const displayedRecipes = availableRecipes.filter(
        recipe => recipe.categoryIDs.indexOf(catID) >= 0
    );
    
    if (displayedRecipes.length === 0 || !displayedRecipes) {
        return (
            <View style={styles.noRecipes}>
                <Text style={styles.noRecipesText}>There are no meals in this category. If you think it shouldn't be, please check your filters.</Text>
            </View>
        )
    }

    return <RecipeList listData={displayedRecipes} navigation={props.navigation} />
}

CategoryRecipesScreen.navigationOptions = (navigationData) => {
    const catID = navigationData.navigation.getParam('categoryID');
    
    const selectedCategory = CATEGORIES.find(cat => cat.id === catID);

    return {
        headerTitle: selectedCategory.title
    }
}

const styles = StyleSheet.create({
    noRecipes: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noRecipesText: {
        textAlign: 'center'
    }
})

export default CategoryRecipesScreen;