import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { colors } from '../globals/style';
import * as Location from 'expo-location';
import { mapStyle } from '../globals/mapStyle';
import { btn, btn2 } from '../globals/style';
import { GOOGLE_MAPS_API } from '@env';

navigator.geolocation = require('react-native-geolocation-service');

const LocationScreen = ({ navigation }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('For You');
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    });

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownVisible(false);
    };

    const handleLocationSelect = (data, details) => {
        const { lat, lng } = details.geometry.location;
        setLocation({ latitude: lat, longitude: lng });
    };

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


    // TODO: add support for own or other location 
    // if pick other, update location to that specific geolocation lat/long
    return (
        <View style={styles.container}>
            <View style={styles.backIcon}>
                <Ionicons name="arrow-back-outline" size={24} color="black" onPress={() => navigation.goBack()} />
            </View>

            <View style={styles.locationContainer}>
                <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsDropdownVisible(true)}>
                    <Text style={styles.dropdownButtonText}>{selectedOption}</Text>
                </TouchableOpacity>
                <Modal visible={isDropdownVisible} animationType="slide" transparent={true}>
                    <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsDropdownVisible(false)}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.modalOption} onPress={() => handleOptionSelect('For You')}>
                                <Text style={styles.modalOptionText}>For You</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOption} onPress={() => handleOptionSelect('For Someone')}>
                                <Text style={styles.modalOptionText}>For Someone</Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                </Modal>
                {/* <View style={styles.autocompleteContainer}>
                    {selectedOption === 'For Someone' &&
                        <GooglePlacesAutocomplete
                            nearbyPlacesAPI='GooglePlacesSearch'
                            placeholder="Enter location"
                            onPress={handleLocationSelect}
                            listViewDisplayed="auto"
                            debounce={400}
                            minLength={2}
                            currentLocation={true}
                            enablePoweredByContainer={false}
                            fetchDetails={true}
                            autoFocus={true}
                            // ref={textInput2}
                            query={{
                                key: GOOGLE_MAPS_API,
                                language: 'en',
                            }}
                            styles={autoComplete}
                        />

                    }
                </View> */}

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('home', { location });
                    }}
                    style={[btn]}>
                    <Text style={styles.button1Text}>Confirm Location</Text>
                </TouchableOpacity>
            </View>
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    customMapStyle={mapStyle}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    region={{
                        latitude: location ? location.latitude : location.latitude,
                        longitude: location ? location.longitude : location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                />
            </View>

        </View>
    )
}

export default LocationScreen

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        // paddingBottom: 30,
        height: SCREEN_HEIGHT,
        backgroundColor: colors.white,
        alignItems: 'center'
    },
    autocompleteContainer: {
        marginTop: 10,
        marginBottom: 30,
        borderColor: 'black',
        height: 100,
        backgroundColor: colors.white,
        zIndex: 4,
        paddingBottom: 10,
    },
    backIcon: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 100
    },
    locationContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        height: 300
    },
    map: {
        height: 600,
        width: SCREEN_WIDTH
    },
    button1: {
        height: 80,
        width: 240,
        backgroundColor: colors.red,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginHorizontal: 10,
        marginBottom: 30,
        padding: 10,
        elevation: 20,
        marginTop: 30
    },
    button1Text: {
        color: colors.white,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    dropdownButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        paddingHorizontal: 12,
        paddingVertical: 10,
        width: 150,
        marginTop: 70,
        marginBottom: 30

    },

    dropdownButtonText: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 20,
        width: '80%',
    },

    modalOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
    },

    modalOptionText: {
        color: '#333333',
        fontSize: 16,
        textAlign: 'center',
    },

    view3: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 10,
        backgroundColor: colors.white,
        //height:30,
        zIndex: 10,


    },
    view4: {
        flexDirection: "row",
        alignItems: "center",

    },
    view5: {
        backgroundColor: colors.grey7,
        width: SCREEN_WIDTH * 0.70,
        height: 40,
        justifyContent: "center",
        marginTop: 10,

    },
    view6: {
        backgroundColor: colors.grey6,
        width: SCREEN_WIDTH * 0.70,
        height: 40,
        justifyContent: "center",
        marginTop: 10,
        paddingLeft: 0
    },
    text1: {
        marginLeft: 10,
        fontSize: 16,
        color: colors.grey1
    },

    image1: {
        height: 70,
        width: 30,
        marginRight: 10,
        marginTop: 10
    },
    view7: {
        flexDirection: "row",
        alignItems: "center"
    },
    view8: {
        marginLeft: 10
    },
})

const autoComplete = {
    textInput: {
        backgroundColor: colors.white,
        height: 60,
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 10,
        fontSize: 15,
        flex: 1,
        borderWidth: 1,
        marginHorizontal: 15,
    },
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: colors.white,
        height: 400,
        width: 400,
        zIndex: 100
    },

    textInputContainer: {
        flexDirection: 'row',
    },

}