import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import cross from '../../assets/redCross.png';

import {
  colors,
  parameters,
  inputContainer,
  input,
  btn,
} from '../globals/style';
import { BACKEND_SERVER_IP } from '../config/variables';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Twilio sometimes crashes. have a backup OTP service
const HomeScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [OTP, setOTP] = useState('');
  const [sendOTP, setSendOTP] = useState(false);

  const handleSendOTP = async () => {
    try {
      await axios.post(
        `https://${BACKEND_SERVER_IP}/api/user/send-otp`,
        JSON.stringify({ phoneNumber }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      window.alert('OTP sent');
      setSendOTP(true);
    } catch (error) {
      window.alert(error);
      return false;
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(
        `https://${BACKEND_SERVER_IP}/api/user/verify-otp`,
        JSON.stringify({
          phoneNumber,
          otp: OTP,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const sessionToken = response.data.token;

      await AsyncStorage.setItem('@sessionToken', sessionToken);
      await AsyncStorage.setItem('@userPhone', phoneNumber);

      window.alert('OTP verified. Please confirm your location.');
    } catch (error) {
      window.alert(error);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.img} source={cross} />
      </View>

      <View style={styles.title}>
        <Text style={styles.titleText}>esos</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={inputContainer}>
          <TextInput
            placeholder="Enter phone number (+91)"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={input}
            keyboardType="number-pad"
          />
        </View>

        {!sendOTP && (
          <View>
            <TouchableOpacity
              style={btn}
              onPress={() => {
                // handleSendOTP()
                navigation.navigate('location');
              }}
            >
              <Text style={styles.text}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        {sendOTP && (
          <View style={styles.otpVerifyContainer}>
            <View style={inputContainer}>
              <TextInput
                placeholder="Enter OTP"
                value={OTP}
                onChangeText={setOTP}
                style={input}
                keyboardType="number-pad"
              />
            </View>
            <TouchableOpacity
              style={btn}
              onPress={() => {
                // const go = handleVerifyOTP();
                // if (go) {
                //   navigation.navigate('location');
                // }
                navigation.navigate('location');
              }}
            >
              <Text style={styles.text}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    height: SCREEN_HEIGHT,
    backgroundColor: '#FFFFFF',
  },
  title: {
    alignItems: 'center',
    marginTop: 40,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  header: {
    height: parameters.headerHeight * 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  locationContainer: {
    marginTop: 20,
  },
  map: {
    height: 250,
    marginVertical: 0,
    width: SCREEN_WIDTH,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  button1: {
    height: 80,
    width: 240,
    backgroundColor: colors.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 60,
    padding: 10,
    elevation: 15,
  },
  button1Text: {
    color: colors.darkGrey,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  button3: {
    height: 80,
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 50,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  otpVerifyContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },

  input: {
    flex: 1,
  },
});
