import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import FlashMessage, { showMessage } from 'react-native-flash-message';

import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/recipes-action';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch value={props.filterName} onValueChange={props.onChange} />
        </View>
    )
}

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegeterian, setIsVegeterian] = useState(false);
    const [isVegan, setIsVegan] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegeterian: isVegeterian
        }

        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegeterian, dispatch]);

    useEffect(() => {
        navigation.setParams({
            save: saveFilters
        })
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <FilterSwitch label="Gluten free" filterName={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch label="Lactose free" filterName={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch label="Vegan" filterName={isVegan} onChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch label="Vegeterian" filterName={isVegeterian} onChange={newValue => setIsVegeterian(newValue)} />
            <FlashMessage position="top" />
        </View>
    )
}

FiltersScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Filter Recipes',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' iconName='ios-menu' onPress={() => {
                    navigationData.navigation.toggleDrawer()
                }} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Save' iconName='ios-save' onPress={() => {
                    navigationData.navigation.getParam('save')();
                    showMessage({
                        message: 'Filters saved!',
                        type: 'info'
                    })
                }} />
            </HeaderButtons>
        ),
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 20
    }
});

export default FiltersScreen;