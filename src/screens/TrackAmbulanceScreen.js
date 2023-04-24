import { View, StyleSheet, Dimensions, Image, Button, TouchableOpacity, Text, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapStyle } from '../globals/mapStyle';
import MapViewDirections from 'react-native-maps-directions';
import { BACKEND_SERVER_IP, GOOGLE_MAPS_API } from '../config/variables';
import { colors, btn } from '../globals/style';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const [recording, setRecording] = React.useState();
    const [isRecording, setIsRecording] = React.useState(false);

    const startRecording = async () => {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');

            setIsRecording(true);
            const recording = new Audio.Recording();

            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);

            await recording.startAsync();
            setRecording(recording);

            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    const stopRecording = async () => {
        console.log('Stopping recording..');

        setRecording(undefined);
        setIsRecording(false);

        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();

        console.log('Recording stopped and stored at', uri);
    }

    const onSend = async () => {
        const emergency_id = await AsyncStorage.getItem("@emergency-id");

        const formData = new FormData();
        formData.append('audio', {
            uri,
            type: 'audio/3gpp',
            name: `recording-${emergency_id}.3gp`,
        });

        try {
            await axios.post(`${BACKEND_SERVER_IP}/api/emergency/audio`,
                formData
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });

            window.alert('audio sent to your paramedic. please take care of your loved ones. The ambulance will be there as soon as possible')
        } catch (error) {
            window.alert("Failed to send audio to server", err)
        }

    }

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
            <View style={styles.audioContainer}>
                <Text styles={styles.audioContainerText}>Please record a quick voice note about the patient's condition for your paramedic</Text>

                {
                    isRecording && <Text style={styles.audioContainerText}>recording...</Text>
                }
                <TouchableOpacity
                    title={recording ? 'Stop Recording' : 'Start Recording'}
                    onPress={recording ? stopRecording : startRecording}
                    style={styles.innerButton}>
                    <View style={styles.innerButton2}>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.sendBtn}
                    onPress={() => onSend()}
                >
                    <Text style={styles.sendBtnText}>Send</Text>
                </TouchableOpacity>
            </View>
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
        height: (3 / 4) * SCREEN_HEIGHT,
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
    audioContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    soundWave: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        opacity: 0.5,
    },
    audioContainerText: {
        textAlign: 'center'
    },
    innerButton: {
        width: 50,
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.red,
        borderWidth: 4,
        marginVertical: 15,
        elevation: 10
    },
    innerButton2: {
        width: 20,
        height: 20,
        backgroundColor: colors.red,
        borderRadius: 100
    },
    sendBtn: {
        width: 150,
        height: 70,
        backgroundColor: colors.red,
        color: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        margin: 10,
        marginVertical: 10,
        padding: 20
    },
    sendBtnText: {
        color: colors.white,
        fontSize: 20,
    },
})