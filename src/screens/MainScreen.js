import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import cross from "../../assets/redCross.png";

import { colors, parameters } from '../globals/style';
import { mapStyle } from "../globals/mapStyle";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SUPPORT_TYPE = {
    LOGIN: 0,
    REGISTER: 1,
};

const HomeScreen = () => {
    const [selected, setSelected] = useState(null);

    const handleSelect = (value) => {
        if (value === SUPPORT_TYPE.BASIC) {
            setSelected(SUPPORT_TYPE.BASIC);
        } else if (value === SUPPORT_TYPE.ADVANCED) {
            setSelected(SUPPORT_TYPE.ADVANCED);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.img} source={cross} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => handleSelect(SUPPORT_TYPE.REGISTER)}
                    style={[
                        styles.button1,
                        selected === SUPPORT_TYPE.REGISTER && { backgroundColor: 'red' },
                    ]}>
                    <Text style={styles.button1Text}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSelect(SUPPORT_TYPE.LOGIN)}
                    style={[
                        styles.button1,
                        selected === SUPPORT_TYPE.LOGIN && { backgroundColor: 'red' },
                    ]}>
                    <Text style={styles.button1Text}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default HomeScreen

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
    map: {
        height: 250,
        marginVertical: 0,
        width: SCREEN_WIDTH
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70
    },
    button1: {
        height: 80,
        width: 240,
        backgroundColor: colors.white,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginHorizontal: 10,
        marginTop: 50,
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
        fontSize: 30,
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
})