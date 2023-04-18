import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import MapComponent from '../components/MapComponent'

const RequestScreen = () => {
    return (
        <View style={styles.container}>
            <MapComponent />
        </View>
    )
}

export default RequestScreen

const SCREEN_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
        height: SCREEN_HEIGHT,
        backgroundColor: '#FFFFFF',
    },
})