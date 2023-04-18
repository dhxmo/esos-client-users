import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { colors, parameters } from '../globals/style';
import cross from "../../assets/redCross.png";
import Ionicons from '@expo/vector-icons/Ionicons';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const LogInScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.backIcon}>
                <Ionicons name="ios-arrow-back" size={32} color="black" onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.header}>
                <Image style={styles.img} source={cross} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder='email' />
            </View>
            <View style={styles.inputContainer}>
                <TextInput secureTextEntry style={styles.input} placeholder='password' />
            </View>

            {/* TODO --- add google auth and persist user state */}
            <View style={styles.btn}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Text style={styles.text}>Log In</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.others}>
                <Text>OR </Text>
            </View>
            <View style={styles.others}>
                <Text>Sign In with</Text>
            </View>

            <View style={styles.btn2}>
                <TouchableOpacity>
                    <Text style={styles.text}>Gmail</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
        height: SCREEN_HEIGHT,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Inter_900Black',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        position: 'absolute',
        top: 50,
        left: 20
    },
    header: {
        height: parameters.headerHeight * 4,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    img: {
        resizeMode: 'contain',
    },
    head: {
        fontSize: 30,
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 50
    },
    inputContainer: {
        flexDirection: 'row',
        width: '80%',
        marginVertical: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: 'grey',
        elevation: 10
    },
    input: {
        color: 'grey'
    },
    btn: {
        width: '80%',
        height: 50,
        backgroundColor: colors.red,
        color: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        margin: 10,
        marginVertical: 40,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Inter_900Black'
    },
    others: {
        marginVertical: 10
    },
    btn2: {
        width: '30%',
        height: 50,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        margin: 10,
    },


})
export default LogInScreen