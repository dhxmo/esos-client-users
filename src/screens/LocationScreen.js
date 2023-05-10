import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { colors } from '../globals/style';
import * as Location from 'expo-location';
import { mapStyle } from '../globals/mapStyle';
import { btn } from '../globals/style';
import { GOOGLE_MAPS_API } from '../config/variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

navigator.geolocation = require('react-native-geolocation-service');

const LocationScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'For You', value: 'For You' },
    { label: 'For Someone', value: 'For Someone' },
  ]);

  const [selectedOption, setSelectedOption] = useState('For You');

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [loading, setLoading] = useState(true);

  // const handleOptionSelect = (option) => {
  //   setSelectedOption(option);
  //   setIsDropdownVisible(false);
  // };

  // TODO: fix the for someone location fix and map update
  const handleLocationSelect = (_, details) => {
    const { lat, lng } = details.geometry.location;
    setLocation({ latitude: lat, longitude: lng });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        window.alert('Permission to access location was denied');
        return;
      }

      let loc = null;
      while (loc === null) {
        loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
        });
        if (loc.coords.latitude && loc.coords.longitude) {
          const address = await Location.reverseGeocodeAsync(loc.coords);
          await AsyncStorage.setItem('@city', address[0].city);

          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });

          setLoading(false);
        } else {
          // Wait for a second before retrying
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    })();
  }, []);

  const handleLocationConfirm = async () => {
    try {
      if (location.latitude && location.longitude) {
        await AsyncStorage.setItem('@location', JSON.stringify(location));
      }
      return true;
    } catch (error) {
      window.alert(error);
      return false;
    }
  };

  if (loading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#BE0000" />
      </View>
    );
  }

  // TODO: For You - drop pin to move to correct location for accurate location
  //  TODO: For Someone - select location properly and update map location on address selection
  return (
    <View style={styles.container}>
      <View style={styles.backIcon}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.dropDownContainerStyle}>
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            items={items}
            setItems={setItems}
            zIndex={2000}
            value={selectedOption}
            setValue={setSelectedOption}
            containerStyle={{ height: 40 }}
            style={styles.dropDown}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownContainerStyle={styles.dropDownStyleContainer}
          />
        </View>

        <View
          style={
            selectedOption === 'For You'
              ? styles.collapsedAutoComplete
              : styles.autocompleteContainer
          }
        >
          {selectedOption === 'For Someone' && (
            <GooglePlacesAutocomplete
              nearbyPlacesAPI="GooglePlacesSearch"
              placeholder="Enter location"
              onPress={handleLocationSelect}
              listViewDisplayed="auto"
              debounce={400}
              minLength={2}
              enablePoweredByContainer={false}
              fetchDetails={true}
              autoFocus={true}
              query={{
                key: GOOGLE_MAPS_API,
                language: 'en',
              }}
              styles={autoComplete}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            const go = handleLocationConfirm();
            if (go) {
              navigation.navigate('select-hospital');
            }
          }}
          style={btn}
        >
          <Text style={styles.button1Text}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
      <View>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={
            selectedOption === 'For Someone' ? styles.map : styles.biggerMap
          }
          customMapStyle={mapStyle}
          showsUserLocation={true}
          followsUserLocation={true}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        />
      </View>
    </View>
  );
};

export default LocationScreen;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT,
  },
  container: {
    height: SCREEN_HEIGHT,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  autocompleteContainer: {
    marginTop: 10,
    marginBottom: 30,
    borderColor: colors.red,
    height: SCREEN_HEIGHT / 4,
    // width: 350,
    // backgroundColor: colors.red,
    zIndex: 4,
    paddingBottom: 10,
  },
  collapsedAutoComplete: {
    height: 0,
  },
  clearBtn: {
    backgroundColor: colors.white,
    width: 50,
    height: 25,
    borderColor: colors.red,
    borderRadius: 20,
    marginLeft: 20,
  },
  confirm: {
    width: 250,
    height: 70,
    backgroundColor: colors.red,
    color: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    margin: 10,
    marginVertical: 40,
    padding: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1000,
  },
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 300,
  },
  map: {
    height: 350,
    width: SCREEN_WIDTH,
    marginTop: 250,
  },
  biggerMap: {
    height: 600,
    width: SCREEN_WIDTH,
  },

  button1: {
    height: 80,
    width: 240,
    backgroundColor: colors.red,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 30,
    padding: 10,
    elevation: 20,
    marginTop: 30,
  },
  button1Text: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropDownContainerStyle: {
    marginTop: 70,
    marginBottom: 70,
  },
  dropDown: {
    width: '40%',
    marginVertical: 20,
  },
  dropDownStyleContainer: {
    width: '40%',
    marginBottom: 30,
  },
  dropdownButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.red,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 150,
    marginTop: 70,
    marginBottom: 30,
  },

  dropdownButtonText: {
    color: colors.red,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 20,
    width: '80%',
  },

  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },

  modalOptionText: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
  },

  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 10,
    backgroundColor: colors.white,
    //height:30,
    zIndex: 10,
  },
  view4: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  view5: {
    backgroundColor: colors.grey7,
    width: SCREEN_WIDTH * 0.7,
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
  },
  view6: {
    backgroundColor: colors.grey6,
    width: SCREEN_WIDTH * 0.7,
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
    paddingLeft: 0,
  },
  text1: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.grey1,
  },

  image1: {
    height: 70,
    width: 30,
    marginRight: 10,
    marginTop: 10,
  },
  view7: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  view8: {
    marginLeft: 10,
  },
});

const autoComplete = {
  textInput: {
    zIndex: 5,
    backgroundColor: colors.white,
    height: 60,
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 15,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: colors.white,
    height: 200,
    width: 350,
    zIndex: 100,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
};
