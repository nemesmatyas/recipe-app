import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import RecipeList from '../components/RecipeList';
import { useSelector } from 'react-redux';

const FavoritesScreen = props => {
    const favoriteRecipes = useSelector(state => state.recipes.favoriteRecipes);

    if (favoriteRecipes.length === 0 || !favoriteRecipes) {
        return <View style={styles.noFav}><Text>You don't have any favorites yet.</Text></View>
    } else {
        return <RecipeList listData={favoriteRecipes} navigation={props.navigation} />
    }

}

FavoritesScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'My Favorite Recipes',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' iconName='ios-menu' onPress={() => {
                    navigationData.navigation.toggleDrawer()
                }} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    noFav: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FavoritesScreen;