import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Dimensions } from 'react-native'
import React from 'react'

import cross from "../../assets/redCross.png";
import { Ionicons } from '@expo/vector-icons';
import { inputContainer, btn, btn2 } from '../globals/style';

const RegisterScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.backIcon}>
                <Ionicons name="arrow-back-outline" size={24} color="black" onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.header}>
                <Image source={cross} />
            </View>
            <View style={inputContainer}>
                <TextInput style={styles.input} placeholder='email' />
            </View>
            <View style={inputContainer}>
                <TextInput style={styles.input} placeholder='password' />
            </View>
            <View style={inputContainer}>
                <TextInput style={styles.input} placeholder='phone number' />
            </View>
            <View style={btn}>
                <TouchableOpacity>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.others}>
                <Text>OR</Text>
            </View>

            <View style={styles.others}>
                <Text>Sign Up with</Text>
            </View>

            <View style={btn2}>
                <TouchableOpacity>
                    <Text style={styles.text}>Gmail</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
        height: SCREEN_HEIGHT,
        backgroundColor: '#FFFFFF',
        flex: 1,
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 100
    },
    head: {
        fontSize: 30,
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 50
    },
    text: {
        color: 'white',
        fontSize: 20,
        // fontFamily: 'Inter_900Black'
    },
})
export default RegisterScreen