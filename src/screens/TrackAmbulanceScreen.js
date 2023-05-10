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
import * as Linking from 'expo-linking';

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

  const [ws, setWs] = useState(null);

  const [driverPhone, setDriverPhone] = useState('');

  useEffect(() => {
    (async () => {
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

    const ws = new WebSocket(`wss://${BACKEND_SERVER_IP}/websocket`);

    ws.addEventListener('open', () => {
      console.log('WebSocket connection established.');
    });

    // TODO: fix message on connection establish. currently defaulting
    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'locationUpdate':
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

    // TODO: update from async storage
    setDriverPhone('111111111');

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
      <View style={styles.chatContainer}>
        {driverPhone && (
          <View style={styles.phoneNumberContainer}>
            <Text>Your ambulance phone number:</Text>
            <TouchableOpacity
              onPress={async () => await Linking.openURL(`tel:${driverPhone}`)}
            >
              <Text style={styles.phoneNumber}> {driverPhone}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

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
    height: 200,
    marginVertical: 10,
    width: SCREEN_WIDTH,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 100,
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
  phoneNumberContainer: {
    flexDirection: 'column',
  },
  phoneNumber: {
    marginTop: 20,
    fontSize: 30,
    color: colors.red,
  },
});
