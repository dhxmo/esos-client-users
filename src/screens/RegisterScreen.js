import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const RegisterScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder='name' />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder='email' />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder='password' />
            </View>

            <View style={styles.btn}>
                <TouchableOpacity>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.others}>
                <Text>OR</Text>
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
        flex: 1,
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
    btn: {
        width: '80%',
        height: 50,
        backgroundColor: 'red',
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
        fontSize: 20
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
export default RegisterScreen