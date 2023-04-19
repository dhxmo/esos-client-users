import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { mapStyle } from '../globals/mapStyle';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../globals/style';


const TrackAmbulanceScreen = ({ route }) => {
    const { location } = route.params;
    const [ambulanceLocation, setAmbulanceLocation] = useState(null);

    useEffect(() => {
        // Get the GPS data for the ambulance from nodeJS websocket
        // and update the state variables
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
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
            >
                {/* {ambulanceLocation && (
                    <MapView.Marker
                        coordinate={ambulanceLocation}
                        title="Ambulance"
                        description="Closest ambulance driver registered on the system GPS"
                    />
                )}
                {location && (
                    <MapView.Marker
                        coordinate={location}
                        title="You are here"
                    />
                )}
                {ambulanceLocation && location && (
                    <MapView.Polyline
                        coordinates={[ambulanceLocation, location]}
                        strokeColor="#000"
                        strokeWidth={2}
                    />
                )} */}
            </MapView>
        </View>
    );
}

export default TrackAmbulanceScreen

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
})