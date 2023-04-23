import { View, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapStyle } from '../globals/mapStyle';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API } from '../config/variables';
import { colors } from '../globals/style';

const locationMarker = require("../../assets/location.png");
const ambulanceMarker = require("../../assets/ambulance.png");

const TrackAmbulanceScreen = ({ }) => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    })
    // update using websockets
    const [ambulanceLocation, setAmbulanceLocation] = useState(null);

    const [region, setRegion] = useState({
        latitude: location ? location.latitude : null,
        longitude: location ? location.longitude : null,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    useEffect(() => {
        // (async () => {
        // const destinationLocation = await AsyncStorage.getItem("@location");

        // const destinationLocationParsed = JSON.parse(destinationLocation);

        // const destination = {
        //     latitude: destinationLocationParsed["latitude"],
        //     longitude: destinationLocationParsed["longitude"]
        // }

        // setLocation({
        //     latitude: destination["latitude"],
        //     longitude: destination["longitude"]
        // })
        // setRegion({
        //     latitude: location.latitude,
        //     longitude: location.longitude,
        //     latitudeDelta: 0.01,
        //     longitudeDelta: 0.01,
        // })
        // })
        // Get the GPS data for the ambulance from nodeJS websocket
        // and update the state variables
        setLocation({
            latitude: 12.9693739,
            longitude: 77.6806338
        })
        setRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        })
    }, []);


    const origin = { latitude: 12.9693739, longitude: 77.6806338 };
    const ambulance = { latitude: 12.9593639, longitude: 77.6706238 };

    return (
        <View style={styles.container}>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={mapStyle}
                showsUserLocation={true}
                followsUserLocation={true}
                region={region}

            >
                {origin.latitude != null &&
                    <Marker coordinate={origin} anchor={{ x: 0.5, y: 0.5 }} >
                        <Image
                            source={locationMarker}
                            style={styles.markerOrigin1}
                            resizeMode="cover"
                        />
                    </Marker>
                }
                {ambulance.latitude != null &&
                    <Marker coordinate={ambulance} anchor={{ x: 0.5, y: 0.5 }} >
                        <Image
                            source={ambulanceMarker}
                            style={styles.markerOrigin2}
                            resizeMode="cover"
                        />
                    </Marker>
                }
                <MapViewDirections
                    origin={origin}
                    destination={ambulance}
                    apikey={GOOGLE_MAPS_API}
                    strokeWidth={4}
                    strokeColor={colors.red}
                />
            </MapView>

            {/* TODO: container here to record audio and send to paramedic  */}
        </View>
    );
}

export default TrackAmbulanceScreen

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
        height: SCREEN_HEIGHT,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    map: {
        height: SCREEN_HEIGHT,
        marginVertical: 10,
        width: SCREEN_WIDTH
    },
    markerOrigin1: {
        width: 20,
        height: 20,
        borderRadius: 10
    },
    destination: {
        width: 20,
        height: 20,
        backgroundColor: colors.black,
        alignItems: "center",
        justifyContent: "center"
    },
    markerDestination: {
        width: 16,
        height: 16,

    },
    markerOrigin2: {
        width: 20,
        height: 20,
        borderRadius: 20,
    },
})