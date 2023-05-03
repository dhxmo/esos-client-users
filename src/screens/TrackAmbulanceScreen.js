import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapStyle } from '../globals/mapStyle';
import MapViewDirections from 'react-native-maps-directions';
import { BACKEND_SERVER_IP, GOOGLE_MAPS_API } from '../config/variables';
import { colors } from '../globals/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatPopup } from '../components/ChatPopUp.component';

const locationMarker = require('../../assets/location.png');
const ambulanceMarker = require('../../assets/ambulance.png');

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

  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [ws, setWs] = useState(null);

  const handleChatOpen = () => {
    setChatVisible(true);
  };

  const handleChatClose = () => {
    setChatVisible(false);
  };

  const handleChatSend = (message) => {
    if (ws) {
      ws.send(JSON.stringify(message));
    }
  };

  useEffect(() => {
    async () => {
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
      setLoading(false);
    };

    // establish websocket connection
    const ws = new WebSocket(`ws://${BACKEND_SERVER_IP}/websocket`);

    ws.addEventListener('open', () => {
      console.log('WebSocket connection established.');
    });

    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'chat':
          setChatMessages((messages) => [...messages, message]);
        case 'locationUpdate':
          setAmbulanceLocation({
            longitude: message.longitude,
            latitude: message.latitude,
          });
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
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {origin.latitude != null && (
          <Marker coordinate={patientLocation} anchor={{ x: 0.5, y: 0.5 }}>
            <Image
              source={locationMarker}
              style={styles.markerOrigin1}
              resizeMode="cover"
            />
          </Marker>
        )}
        {ambulance.latitude != null && (
          <Marker coordinate={ambulanceLocation} anchor={{ x: 0.5, y: 0.5 }}>
            <Image
              source={ambulanceMarker}
              style={styles.markerOrigin2}
              resizeMode="cover"
            />
          </Marker>
        )}
        <MapViewDirections
          origin={patientLocation}
          destination={ambulanceLocation}
          apikey={GOOGLE_MAPS_API}
          strokeWidth={4}
          strokeColor={colors.red}
        />
      </MapView>

      <View style={styles.audioContainer}>
        <TouchableOpacity onPress={handleChatOpen}>
          <Text>Open chat</Text>
        </TouchableOpacity>

        <ChatPopup
          visible={chatVisible}
          onClose={handleChatClose}
          onSend={handleChatSend}
        />

        {chatMessages.map((message, index) => (
          <Text key={index}>{message.text}</Text>
        ))}
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
    height: (3 / 4) * SCREEN_HEIGHT,
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
    width: 20,
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
});
