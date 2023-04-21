import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'

import cross from "../../assets/redCross.png";
import { Ionicons } from '@expo/vector-icons';
import { inputContainer, btn, btn2, input } from '../globals/style';
import axios from 'axios';
import { BACKEND_SERVER_IP } from '../config/variables'

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePasswordStrength = (password) => {
        const hasNumber = /\d/;
        const hasLowercase = /[a-z]/;

        const isValidLength = password.length >= 5;
        const hasValidNumber = hasNumber.test(password);
        const hasValidLowercase = hasLowercase.test(password);
        return (
            isValidLength &&
            hasValidNumber &&
            hasValidLowercase
        );
    };

    const validatePhoneNumber = (phoneNumber) => {
        const re = /^\d{10}$/;
        return re.test(phoneNumber);
    };


    const handleRegister = async () => {
        if (!validateEmail(email)) {
            alert('Please enter a valid email address!');
            return false;
        }

        if (!validatePasswordStrength(password)) {
            alert('Please enter a strong password!');
            return false;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            alert('Please enter a valid phone number!');
            return false;
        }

        const data = {
            email,
            password,
            phoneNumber,
        };

        try {
            const response = await axios.post(`${BACKEND_SERVER_IP}/api/user/register`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            window.alert('Registered successfully');
            return true;
        } catch (error) {
            window.alert(error);
            return false;
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.backIcon}>
                <Ionicons name="arrow-back-outline" size={24} color="black" onPress={() => navigation.goBack()} />
            </View>
            <View>
                <Image source={cross} />
            </View>
            <View style={inputContainer}>
                <TextInput style={input} value={email}
                    onChangeText={setEmail} placeholder='email' />
            </View>
            <View style={inputContainer}>
                <TextInput style={input} value={password} secureTextEntry={true} onChangeText={setPassword} placeholder='password' />
            </View>
            <View style={inputContainer}>
                <TextInput style={input} value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder='phone number' />
            </View>
            <View style={btn}>
                <TouchableOpacity onPress={async () => {
                    const go = await handleRegister();
                    if (go) {
                        navigation.navigate('login')
                    }
                }}>
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
        </View >
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