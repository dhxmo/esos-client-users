import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import MapComponent from '../components/MapComponent'
import Ionicons from '@expo/vector-icons/Ionicons';

const RequestScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.backIcon}>
                <Ionicons name="ios-arrow-back" size={32} color="black" onPress={() => navigation.goBack()} />
            </View>
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
    backIcon: {
        position: 'absolute',
        top: 50,
        left: 20
    }
})