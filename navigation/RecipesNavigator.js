import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryRecipesScreen from '../screens/CategoryRecipesScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const DEFAULT_STACKNAV_OPTIONS = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primaryColor
}

const RecipesNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryRecipes: {
        screen: CategoryRecipesScreen,
        
    },
    RecipeDetail: RecipeDetailScreen   
},
{
    defaultNavigationOptions: DEFAULT_STACKNAV_OPTIONS
});

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    RecipeDetail: RecipeDetailScreen
},
{
    defaultNavigationOptions: DEFAULT_STACKNAV_OPTIONS
})

const RecipeFavTabNavigator = createBottomTabNavigator({
    Recipes: {
        screen: RecipesNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            }
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            }
        }
    }
},
{
    tabBarOptions: {
        activeTintColor: Colors.accentColor
    }
})

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
},
{
    defaultNavigationOptions: DEFAULT_STACKNAV_OPTIONS
})

const MainNavigator = createDrawerNavigator({
    RecipeFavs: {
        screen: RecipeFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Favorite Recipes'
        }
    },
    
    Filters: FiltersNavigator
},
{
    contentOptions: {
        activeTintColor: Colors.accentColor
    }
}
);

export default createAppContainer(MainNavigator);