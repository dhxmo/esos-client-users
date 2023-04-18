import React, { Component } from 'react'
import { StyleSheet, View, Dimensions, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { mapStyle } from '../globals/mapStyle';

export default class MapComponent extends Component {

    render() {
        const { latitude, longitude } = this.props;
        return (
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    customMapStyle={mapStyle}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation={true}
                    followsUserLocation={true}
                />
            </View>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    map: {
        height: SCREEN_HEIGHT,
        marginVertical: 0,
        width: SCREEN_WIDTH
    },
    markerWrapOrigin: {
        width: 40,
        height: 20,
    },
    markerOrigin: {
        width: 16,
        height: 16,
        borderRadius: 8
    },

    destination: {
        width: 20,
        height: 20,
        backgroundColor: 'black',
        alignItems: "center",
        justifyContent: "center"
    },

    view1: {
        width: 7,
        height: 7,
        backgroundColor: "white"
    },
    markerDestination: {
        width: 16,
        height: 16,

    },

    markerOrigin2: {
        width: 20,
        height: 20,
        borderRadius: 10
    },

    car: {
        paddingTop: 0,
        width: 40,
        height: 20,
    },

    view2: {
        position: "absolute",
        top: 10,
        right: 12,
        backgroundColor: "white",
        height: 40,
        width: 180,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        zIndex: 8

    },

    view3: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 2,
    },

    view4: {
        position: "absolute",
        top: 50,
        left: 12,
        backgroundColor: "white",
        height: 40,
        width: 140,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        zIndex: 8

    },

    location: {
        width: 20,
        height: 20,
        borderRadius: 9,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center"

    },

    view9: {
        width: 6,
        height: 6,
        borderRadius: 4,
        backgroundColor: "white"
    }
})