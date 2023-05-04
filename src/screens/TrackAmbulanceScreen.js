import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapStyle } from '../globals/mapStyle';
import MapViewDirections from 'react-native-maps-directions';
import { BACKEND_SERVER_IP, GOOGLE_MAPS_API } from '../config/variables';
import { colors } from '../globals/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { RecordingPlay } from '../components/RecordingPlay';

const locationMarker = require('../../assets/location.png');
const ambulanceMarker = require('../../assets/ambulance.png');
const mic = require('../../assets/mic.png');
const stop = require('../../assets/stop.png');
const send = require('../../assets/send.png');

const TrackAmbulanceScreen = ({}) => {
  const [patientLocation, setPatientLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [ambulanceLocation, setAmbulanceLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [loading, setLoading] = useState(true);

  const [chatMessages, setChatMessages] = useState([]);
  const [ws, setWs] = useState(null);

  const [text, setText] = useState('');

  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recordingURI, setRecordingURI] = useState('');

  const [userPhone, setUserPhone] = useState('');

  const handleTextChange = (value) => {
    setText(value);
  };

  const recordingOptions = {
    android: {
      extension: '.m4a',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      maxDuration: 60, // set max duration to 60 seconds
    },
    ios: {
      extension: '.caf',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
      maxDuration: 60, // set max duration to 60 seconds
    },
  };

  const handleAudioRecord = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');

      setIsRecording(true);

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        recordingOptions
        // Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);

      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const handleAudioStop = async () => {
    console.log('Stopping recording..');
    setRecording(null);
    setIsRecording(false);

    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording.getURI();
    setRecordingURI(uri);
  };

  //  TODO: this is going to require changes. figure out codec
  const handleSend = async () => {
    // const response = await fetch(recordingURI);
    // const arrayBuffer = await response.arrayBuffer();
    // const audioBlob = new Blob([arrayBuffer], { type: 'audio/3gpp' });

    const message = {
      type: 'chat',
      text,
      // recording: {
      //   uri: recordingURI,
      //   blob: audioBlob,
      // },
    };

    if (ws) {
      ws.send(JSON.stringify(message));
    }

    setChatMessages([...chatMessages, message]);

    setText('');
    setRecording(null);
    setRecordingURI('');
  };

  useEffect(() => {
    (async () => {
      const phone = await AsyncStorage.getItem('@userPhone');
      setUserPhone(phone);

      const destinationLocation = await AsyncStorage.getItem('@location');

      const destinationLocationParsed = JSON.parse(destinationLocation);

      const destination = {
        latitude: destinationLocationParsed['latitude'],
        longitude: destinationLocationParsed['longitude'],
      };

      setPatientLocation({
        latitude: destination['latitude'],
        longitude: destination['longitude'],
      });

      // TODO: dummy. make call to websockets and add to array
      setAmbulanceLocation({
        latitude: 12.968868,
        longitude: 77.6812007,
      });

      setLoading(false);
    })();

    // establish websocket connection
    const ws = new WebSocket(`ws://${BACKEND_SERVER_IP}/websocket`);

    ws.addEventListener('open', () => {
      console.log('WebSocket connection established.');
    });

    // TODO: websocket send chats
    // TODO: fix this and test back n forth chats being passed as well as the audio blob
    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'chat':
          if (message.recording && message.recording.blob) {
            const audioData = URL.createObjectURL(message.recording.blob);
            message.recording.data = audioData;
          }
          setChatMessages((messages) => [...messages, message]);
          break;
        case 'emergencyLocationUpdate':
          setAmbulanceLocation({
            longitude: message.longitude,
            latitude: message.latitude,
          });
          break;
        default:
          console.log('Unknown message type:', message.type);
      }
    });

    setWs(ws);

    return () => {
      ws.close();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#BE0000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        showsUserLocation={true}
        followsUserLocation={true}
        region={{
          latitude: patientLocation.latitude,
          longitude: patientLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {patientLocation.latitude != null && (
          <Marker coordinate={patientLocation} anchor={{ x: 0.5, y: 0.5 }}>
            <Image
              source={locationMarker}
              style={styles.markerOrigin1}
              resizeMode="cover"
            />
          </Marker>
        )}
        {ambulanceLocation.latitude != null && (
          <Marker coordinate={ambulanceLocation} anchor={{ x: 0.5, y: 0.5 }}>
            <Image
              source={ambulanceMarker}
              style={styles.markerOrigin2}
              resizeMode="cover"
            />
          </Marker>
        )}
        <MapViewDirections
          origin={ambulanceLocation}
          destination={patientLocation}
          apikey={GOOGLE_MAPS_API}
          strokeWidth={4}
          strokeColor={colors.red}
        />
      </MapView>

      <View style={styles.chatContainer}>
        {/* TODO: if message.phoneNumber === senderPhone, display on right side */}
        <ScrollView style={styles.chatsContainer}>
          {chatMessages.map((message, index) => (
            <View style={styles.msgContainer} key={index}>
              {message.recording?.uri ? (
                <RecordingPlay uri={message.recording} />
              ) : (
                <Text style={styles.msgText}>{message.text}</Text>
              )}
            </View>
          ))}
        </ScrollView>

        {isRecording && <Text>recording...</Text>}

        <View style={styles.inputContainerWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="enter text here..."
              style={styles.input}
              value={text}
              onChangeText={handleTextChange}
            />

            {!isRecording && (
              <TouchableOpacity onPress={handleAudioRecord}>
                <Image source={mic} style={styles.icon} />
              </TouchableOpacity>
            )}

            {isRecording && (
              <TouchableOpacity onPress={handleAudioStop}>
                <Image source={stop} style={styles.icon} />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleSend}>
              <Image source={send} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TrackAmbulanceScreen;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    height: SCREEN_HEIGHT,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  map: {
    height: (2 / 3) * SCREEN_HEIGHT,
    marginVertical: 10,
    width: SCREEN_WIDTH,
  },
  markerOrigin1: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  destination: {
    width: 20,
    height: 20,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDestination: {
    width: 16,
    height: 16,
  },
  markerOrigin2: {
    width: 25,
    height: 20,
    borderRadius: 20,
  },
  audioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  audioContainerText: {
    textAlign: 'center',
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
    elevation: 10,
  },
  innerButton2: {
    width: 20,
    height: 20,
    backgroundColor: colors.red,
    borderRadius: 100,
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
    padding: 20,
  },
  sendBtnText: {
    color: colors.white,
    fontSize: 20,
  },
  chatContainer: {
    height: (1 / 3) * SCREEN_HEIGHT,
    marginVertical: 10,
    width: SCREEN_WIDTH,
    flexDirection: 'column',
    alignItems: 'center',
  },
  chatsContainer: {
    height: 150,
    width: '80%',
    padding: 5,
    backgroundColor: colors.white,
  },
  msgContainer: {
    backgroundColor: colors.grey6,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    maxWidth: '70%',
  },
  msgText: {
    color: colors.red,
    fontSize: 25,
    marginVertical: 5,
  },
  chatInput: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
  inputContainerWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: 'grey',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});
