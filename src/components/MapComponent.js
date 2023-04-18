import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { mapStyle } from '../globals/mapStyle';

export default class MapComponent extends Component {
    render() {
        return (
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    customMapStyle={mapStyle}
                    region={{
                        latitude: 20.5937,
                        longitude: 78.9629,
                        latitudeDelta: 25,
                        longitudeDelta: 25,
                    }}
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
})