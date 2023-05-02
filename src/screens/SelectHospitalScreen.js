import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import cross from '../../assets/redCross.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import { btn } from '../globals/style';
import DropDownPicker from 'react-native-dropdown-picker';

const SelectHospitalScreen = () => {
  const [closest, setClosest] = useState(null);
  const [selected, setSelected] = useState(null);

  const [open, setOpen] = useState(false);
  const [ambulanceType, setAmbulanceType] = useState('');
  const [items, setItems] = useState([
    { label: 'Advanced Life Support', value: 'ALS' },
    { label: 'Basic Life Support', value: 'BLS' },
  ]);

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
      <View>
        <TouchableOpacity
          style={btn}
          onPress={() => {
            navigation.navigate('order-ambulance');
          }}
        >
          <Text style={styles.text}>closest hospital</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={btn}
          onPress={() => {
            navigation.navigate('order-ambulance');
          }}
        >
          <Text style={styles.text}>select specific hospital</Text>
        </TouchableOpacity>
        {selected && (
          <TouchableOpacity>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              items={items}
              setItems={setItems}
              zIndex={2000}
              value={ambulanceType}
              setValue={setAmbulanceType}
              containerStyle={{ height: 40 }}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownContainerStyle={styles.dropDownStyleContainer}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SelectHospitalScreen;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    height: SCREEN_HEIGHT,
    backgroundColor: '#FFFFFF',
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
});
