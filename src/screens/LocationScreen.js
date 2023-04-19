import { View, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapComponent from '../components/MapComponent'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';

import * as Location from 'expo-location';
import { mapStyle } from '../globals/mapStyle';

const LocationScreen = ({ navigation }) => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    });

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        })();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.backIcon}>
                <Ionicons name="ios-arrow-back" size={32} color="black" onPress={() => navigation.goBack()} />
            </View>
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    customMapStyle={mapStyle}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                />
            </View>
            <TouchableOpacity
                onPress={navigation.navigate('home', { location })}
                style={[
                    styles.button1
                ]}>
                <Text style={styles.button1Text}>Confirm Location</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LocationScreen

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
    },
    map: {
        height: 250,
        marginVertical: 10,
        width: SCREEN_WIDTH
    },
})