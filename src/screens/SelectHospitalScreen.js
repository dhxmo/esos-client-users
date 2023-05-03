import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import cross from '../../assets/redCross.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import { parameters, colors } from '../globals/style';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BACKEND_SERVER_IP } from '../config/variables';

const SELECTED_TYPE = {
  CLOSEST: 'closest',
  SPECIFIC: 'specific',
};

const SelectHospitalScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('');

  const [open, setOpen] = useState(false);
  const [hospitalID, setHospitalID] = useState('');

  const [items, setItems] = useState([]);

  const handleSelect = (value) => {
    if (value === SELECTED_TYPE.CLOSEST) {
      setSelected(SELECTED_TYPE.CLOSEST);
    } else if (value === SELECTED_TYPE.SPECIFIC) {
      setSelected(SELECTED_TYPE.SPECIFIC);
    }
  };

  const findSpecificHospitals = async () => {
    let hospitals = [];
    try {
      const token = await AsyncStorage.getItem('@sessionToken');
      const city = await AsyncStorage.getItem('@city');

      const res = await axios.get(
        `${BACKEND_SERVER_IP}/api/hospitals/get-all-available`,
        JSON.stringify(city),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );

      const listOfAvailableHospitals = res.message;
      for (let i = 0; i < listOfAvailableHospitals.length; i++) {
        hospitals.push({
          label: listOfAvailableHospitals[i].name,
          value: listOfAvailableHospitals[i]._id,
        });
      }

      setItems(hospitals);

      return true;
    } catch (error) {
      window.alert(error);
      return false;
    }
  };

  const handleHospitalSelection = async () => {
    try {
      if (value === SELECTED_TYPE.CLOSEST) {
        await AsyncStorage.setItem('@closestHospital?', true);
      } else if (value === SELECTED_TYPE.SPECIFIC) {
        await AsyncStorage.setItem('@closestHospital?', false);
        await AsyncStorage.setItem('@hospitalID', hospitalID);
        // find id from list of items and store in async storage
      }
      return true;
    } catch (err) {
      return false;
    }
  };

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
      <View style={styles.header}>
        <Image style={styles.img} source={cross} />
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>esos</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.btn,
            selected === SELECTED_TYPE.CLOSEST && {
              backgroundColor: colors.red,
            },
          ]}
          onPress={() => {
            handleSelect(SELECTED_TYPE.CLOSEST);
          }}
        >
          <Text style={styles.buttonText}>closest hospital</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            selected === SELECTED_TYPE.SPECIFIC && {
              backgroundColor: colors.red,
            },
          ]}
          onPress={async () => {
            handleSelect(SELECTED_TYPE.SPECIFIC);
            await findSpecificHospitals();
          }}
        >
          <Text style={styles.buttonText}>select specific hospital</Text>
        </TouchableOpacity>
        {selected === 'specific' && (
          <TouchableOpacity>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              items={items}
              setItems={setItems}
              zIndex={2000}
              value={hospitalID}
              setValue={setHospitalID}
              containerStyle={{ height: 40 }}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownContainerStyle={styles.dropDownStyleContainer}
            />
            console.log(hospitalID);
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button2}
          onPress={async () => {
            // const go = await handleHospitalSelection();
            // if (go) {
            //   navigation.navigate('order-ambulance');
            // }
            navigation.navigate('order-ambulance');
          }}
        >
          <Text style={styles.button2Text}>confirm hospital</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectHospitalScreen;

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
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1000,
  },
  header: {
    height: parameters.headerHeight * 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    marginTop: 50,
    resizeMode: 'contain',
  },
  btn: {
    width: 250,
    height: 70,
    backgroundColor: colors.white,
    color: colors.red,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    margin: 10,
    marginVertical: 20,
    padding: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: colors.darkGrey,
    fontSize: 20,
  },
  dropDown: {
    width: '80%',
    marginVertical: 20,
  },
  dropDownStyleContainer: {
    width: '80%',
    marginBottom: 30,
  },
  button2: {
    height: 160,
    width: 160,
    backgroundColor: colors.red,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 50,
    padding: 10,
    elevation: 20,
  },
  button2Text: {
    color: colors.white,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
