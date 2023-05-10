import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import cross from '../../assets/redCross.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import { parameters, colors } from '../globals/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BACKEND_SERVER_IP } from '../config/variables';

const SELECTED_TYPE = {
  CLOSEST: 'closest',
  SPECIFIC: 'specific',
};

const SelectHospitalScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('');

  const [hospitalID, setHospitalID] = useState('');
  const [hospitals, setHospitals] = useState([]);

  const handleSelect = (value) => {
    if (value === SELECTED_TYPE.CLOSEST) {
      setSelected(SELECTED_TYPE.CLOSEST);
    } else if (value === SELECTED_TYPE.SPECIFIC) {
      setSelected(SELECTED_TYPE.SPECIFIC);
    }
  };

  const findSpecificHospitals = async () => {
    let hospitalsList = [];

    const token = await AsyncStorage.getItem('@sessionToken');
    const city = await AsyncStorage.getItem('@city');

    try {
      const res = await axios.get(
        `https://${BACKEND_SERVER_IP}/api/hospital/get-all-available/${city}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );

      const listOfAvailableHospitals = res.data.message;
      for (let i = 0; i < listOfAvailableHospitals.length; i++) {
        hospitalsList.push({
          name: listOfAvailableHospitals[i].name,
          id: listOfAvailableHospitals[i]._id,
        });
      }
      setHospitals(hospitalsList);

      return true;
    } catch (error) {
      window.alert(error);
      return false;
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const renderHospital = ({ item }) => (
    <TouchableOpacity
      style={styles.hospital}
      onPress={() => {
        setHospitalID(item.id);
        setModalVisible(false);
      }}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleHospitalSelection = async () => {
    try {
      if (selected === SELECTED_TYPE.CLOSEST) {
        await AsyncStorage.setItem('@closestHospital?', 'true');
      } else if (selected === SELECTED_TYPE.SPECIFIC) {
        await AsyncStorage.setItem('@closestHospital?', 'false');
        await AsyncStorage.setItem('@hospitalID', hospitalID);
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
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Select specific hospital</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          animationType="slide"
          style={styles.modalContainer}
        >
          <TouchableOpacity
            style={styles.modalHeader}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalHeaderText}>Close</Text>
          </TouchableOpacity>
          <FlatList
            data={hospitals}
            renderItem={renderHospital}
            keyExtractor={(item) => item.id}
          />
        </Modal>
        {hospitalID && (
          <Text style={styles.selectedHospitalText}>
            Selected hospital: {hospitals.find((h) => h.id === hospitalID).name}
          </Text>
        )}

        <TouchableOpacity
          style={styles.button2}
          onPress={async () => {
            const go = await handleHospitalSelection();
            if (go) {
              navigation.navigate('order-ambulance');
            }
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
    height: 120,
    width: 120,
    backgroundColor: colors.red,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 90,
    padding: 10,
    elevation: 20,
  },
  button2Text: {
    color: colors.white,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalHeader: {
    backgroundColor: '#eee',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalHeaderText: {
    fontWeight: 'bold',
  },
  hospital: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedHospitalText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
