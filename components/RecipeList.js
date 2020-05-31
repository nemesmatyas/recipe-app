import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import RecipeItem from '../components/RecipeItem';

import { useSelector } from 'react-redux';

const RecipeList = props => {
    const favoriteRecipes = useSelector(state => state.recipes.favoriteRecipes);

    const renderRecipe = itemData => {
        const isFavorite = favoriteRecipes.some(recipe => recipe.id === itemData.item.id);

        return (
            <RecipeItem
                title={itemData.item.title}
                duration={itemData.item.duration}
                affordability={itemData.item.affordability.toUpperCase()}
                complexity={itemData.item.complexity.toUpperCase()}
                image={itemData.item.imageUrl}
                onSelect={() => {
                    props.navigation.navigate({routeName: 'RecipeDetail', params: {
                        recipeID: itemData.item.id,
                        recipeTitle: itemData.item.title,
                        isFav: isFavorite
                    }})
                }} />
        )
    }

    return (
        <View style={styles.list}>
            <FlatList 
                style={{width: '100%'}}
                data={props.listData}
                keyExtractor={(item, index) => item.id} 
                renderItem={renderRecipe} />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default RecipeList;