import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const RecipeItem = props => {
    return (
        <View style={styles.recipeItem}>
            <TouchableOpacity onPress={props.onSelect}>
                <View>
                    <View style={{...styles.recipeRow, ...styles.recipeHeader}}>
                        <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
                            <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.recipeRow, ...styles.recipeDetails}}>
                        <Text>{props.duration} minutes</Text>
                        <Text>{props.complexity}</Text>
                        <Text>{props.affordability}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    recipeItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 22,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    recipeRow: {
        flexDirection: 'row'
    },
    recipeHeader: {
        height: '90%'
    },
    recipeDetails: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        height: '10%'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    }
})

export default RecipeItem;