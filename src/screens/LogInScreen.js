import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { colors, parameters } from '../globals/style';
import cross from "../../assets/redCross.png";
import { Ionicons } from '@expo/vector-icons';
import { inputContainer, btn, btn2, input } from '../globals/style';
import { BACKEND_SERVER_IP } from '../config/variables';
import axios from 'axios';

const LogInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const data = {
            email,
            password,
        };

        try {
            await axios.post(`${BACKEND_SERVER_IP}/api/user/login`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            window.alert('Logged in successfully');
            return true;
        } catch (error) {
            window.alert(error);
            return false;
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.backIcon}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </View>
            <View style={styles.header}>
                <Image style={styles.img} source={cross} />
            </View>
            <View style={inputContainer}>
                <TextInput style={input} value={email}
                    onChangeText={setEmail} placeholder='email' />
            </View>
            <View style={inputContainer}>
                <TextInput value={password} secureTextEntry={true} onChangeText={setPassword} style={input} placeholder='password' />
            </View>

            {/* TODO --- add google auth and persist user state */}
            <View style={btn}>
                <TouchableOpacity onPress={async () => {
                    const go = await handleLogin();
                    if (go) {
                        navigation.navigate('location')
                    }
                }}>
                    <Text style={styles.text}>Log In</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.others}>
                <Text>OR </Text>
            </View>
            <View style={styles.others}>
                <Text>Sign In with</Text>
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
        // fontFamily: 'Inter_900Black',
        flex: 1,
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
    header: {
        height: parameters.headerHeight * 4,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    img: {
        resizeMode: 'contain',
        zIndex: -1
    },
    head: {
        fontSize: 30,
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 50
    },
    input: {
        color: 'grey'
    },
    text: {
        color: 'white',
        fontSize: 20,
        // fontFamily: 'Inter_900Black'
    },
    others: {
        marginVertical: 10
    },
})
export default LogInScreen