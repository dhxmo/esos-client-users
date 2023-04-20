import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import cross from "../../assets/redCross.png";

import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, parameters } from '../globals/style';
import axios from 'axios';
import { btn } from '../globals/style';

// require('react-native-dotenv').config();
const SUPPORT_TYPE = {
    BASIC: 'basic',
    ADVANCED: 'advanced',
};

const HomeScreen = ({ navigation, route }) => {
    const { location } = route.params;

    const [selected, setSelected] = useState({
        selectedType: null,
        emergency: false
    });

    const handleSelect = (value) => {
        if (value === SUPPORT_TYPE.BASIC) {
            setSelected({
                selectedType: SUPPORT_TYPE.BASIC,
                emergency: false
            });
        } else if (value === SUPPORT_TYPE.ADVANCED) {
            setSelected({
                selectedType: SUPPORT_TYPE.ADVANCED,
                emergency: true
            });
        }
    };

    const handleEmergencyCall = () => {
        if (!selected.selectedType) {
            alert('Please select BLS or ALS');
            return false;
        } else {
            const data = {
                latitude: location.latitude,
                longitude: location.longitude,
                selected: selected.selectedType,
                emergency: selected.emergency
            };
            axios.post(`${process.env.BACKEND_SERVER_IP}/api/emergency/call`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.data)
                .then(data => console.log(data))
                .catch(error => console.error(error));
            return true;
        }


    };

    return (
        <View style={styles.container}>
            <View style={styles.backIcon}>
                <Ionicons name="arrow-back-outline" size={24} color="black" onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.header}>
                <Image style={styles.img} source={cross} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => handleSelect(SUPPORT_TYPE.BASIC)}
                    style={[
                        styles.button1,
                        selected.selectedType === SUPPORT_TYPE.BASIC && { backgroundColor: 'red' },
                    ]}>
                    <Text style={styles.button1Text}>Basic Life Support</Text>
                    <Text>Small Injuries</Text>
                    <Text>₹1500</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSelect(SUPPORT_TYPE.ADVANCED)}
                    style={[
                        styles.button1,
                        selected.selectedType === SUPPORT_TYPE.ADVANCED && { backgroundColor: 'red' },
                    ]}>
                    <Text style={styles.button1Text}>Advanced Life Support</Text>
                    <Text>Heart Attack, Stroke</Text>
                    <Text>₹3000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    const go = handleEmergencyCall();
                    if (go) navigation.navigate('track-ambulance', { location })
                }}>
                    <Text style={styles.button2Text}>Call Ambulance</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
        height: SCREEN_HEIGHT,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: parameters.headerHeight * 4,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    locationContainer: {
        marginTop: 20
    },
    backIcon: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 100
    },
    map: {
        height: 250,
        marginVertical: 10,
        width: SCREEN_WIDTH
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button1: {
        height: 80,
        width: 240,
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginHorizontal: 10,
        marginTop: 60,
        padding: 10,
        elevation: 20
    },
    button1Text: {
        color: colors.darkGrey,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button2: {
        height: 80,
        width: 300,
        backgroundColor: colors.red,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginHorizontal: 10,
        marginTop: 50,
        padding: 10,
        elevation: 20
    },
    button2Text: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    button3: {
        height: 80,
        backgroundColor: colors.lightBlue,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        padding: 10,
        elevation: 20,
    },
    button3Text: {
        color: colors.white,
        fontSize: 20,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    btn: {
        width: '60%',
        height: 70,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        margin: 10,
        marginVertical: 40,
        padding: 20,
        marginTop: 60
    },
})