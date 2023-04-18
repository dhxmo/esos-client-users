import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react'
import cross from "../../assets/redCross.png";

import { colors, parameters } from '../globals/style';
import { mapStyle } from "../globals/mapStyle";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { OriginContext } from '../context/contexts';
// import Geolocation from '@react-native-community/geolocation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SUPPORT_TYPE = {
    BASIC: 0,
    ADVANCED: 1,
};

const HomeScreen = ({ navigation }) => {
    const { dispatchOrigin } = useContext(OriginContext)

    const [location, setLocation] = useState(null);
    const [selected, setSelected] = useState(null);

    const handleSelect = (value) => {
        if (value === SUPPORT_TYPE.BASIC) {
            setSelected(SUPPORT_TYPE.BASIC);
        } else if (value === SUPPORT_TYPE.ADVANCED) {
            setSelected(SUPPORT_TYPE.ADVANCED);
        }
    };



    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // pass location to reducers
            dispatchOrigin({
                type: "ADD_ORIGIN", payload: {
                    latitude: location.latitude,
                    longitude: location.longitude
                }
            })
        })();
    }, []);


    const _map = useRef(1);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.img} source={cross} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => handleSelect(SUPPORT_TYPE.BASIC)}
                    style={[
                        styles.button1,
                        selected === SUPPORT_TYPE.BASIC && { backgroundColor: 'red' },
                    ]}>
                    <Text style={styles.button1Text}>Basic Life Support</Text>
                    <Text>Small Injuries</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleSelect(SUPPORT_TYPE.ADVANCED)}
                    style={[
                        styles.button1,
                        selected === SUPPORT_TYPE.ADVANCED && { backgroundColor: 'red' },
                    ]}>
                    <Text style={styles.button1Text}>Advanced Life Support</Text>
                    <Text>Heart Attack, Stroke</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('request')}>
                    <Text style={styles.button2Text}>Call Ambulance</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.locationContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    customMapStyle={mapStyle}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    region={{
                        latitude: 20.5937,
                        longitude: 78.9629,
                        latitudeDelta: 25,
                        longitudeDelta: 25,
                    }}
                />
            </View>
        </View>
    )
}

// onPress = {(data, details = null)=> {
//     dispatchOrigin({
//         type: "ADD_ORIGIN", payload: {
//             latitude: details.geometry.location.lat,
//             longitude: details.geometry.location.lng,
//             address: details.formatted_address,
//             name: details.name
//         }
//     })

//     setDestination(true)
// }}


export default HomeScreen

const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
        height: SCREEN_HEIGHT,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: parameters.headerHeight * 4,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    locationContainer: {
        marginTop: 20
    },
    map: {
        height: 250,
        marginVertical: 0,
        width: SCREEN_WIDTH
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button1: {
        height: 80,
        width: 240,
        backgroundColor: colors.white,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginHorizontal: 10,
        marginTop: 30,
        padding: 10,
        elevation: 20
    },
    button1Text: {
        color: colors.darkGrey,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button2: {
        height: 80,
        width: 300,
        backgroundColor: colors.red,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginHorizontal: 10,
        marginTop: 50,
        padding: 10,
        elevation: 20
    },
    button2Text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    button3: {
        height: 80,
        backgroundColor: colors.lightBlue,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
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
        resizeMode: 'contain',
    },


    // /////////////////////////////
    // image1: {

    //     height: 100,
    //     width: 100,

    // },

    // image2: {
    //     height: 60, width: 60,
    //     borderRadius: 30,
    // },

    // home: {
    //     width: '100%',
    //     height: '100%',
    //     backgroundColor: colors.blue,
    //     paddingLeft: 20,

    // },

    // text1: {
    //     color: colors.white,
    //     fontSize: 21,
    //     paddingBottom: 20,
    //     paddingTop: 20
    // },

    // text2: {
    //     color: colors.white,
    //     fontSize: 16
    // },

    // view1: {
    //     flexDirection: "row",
    //     flex: 1,
    //     paddingTop: 30
    // },


    // card: {
    //     alignItems: "center",
    //     margin: SCREEN_WIDTH / 22

    // },

    // view2: {
    //     marginBottom: 5,
    //     borderRadius: 15,
    //     backgroundColor: colors.grey6
    // },

    // title: {
    //     color: colors.black,
    //     fontSize: 16
    // },
    // view3: {
    //     flexDirection: "row",
    //     marginTop: 5,
    //     height: 50,
    //     backgroundColor: colors.grey6,
    //     alignItems: "center",
    //     justifyContent: "space-between",
    //     marginHorizontal: 15

    // },
    // text3: {
    //     marginLeft: 15,
    //     fontSize: 20,
    //     color: colors.black
    // },

    // view4: {
    //     flexDirection: "row",
    //     alignItems: "center",
    //     marginRight: 15,
    //     backgroundColor: "white",
    //     paddingHorizontal: 10,
    //     paddingVertical: 2,
    //     borderRadius: 20
    // },

    // view5: {
    //     flexDirection: "row",
    //     alignItems: "center",
    //     backgroundColor: "white",
    //     paddingVertical: 25,
    //     justifyContent: "space-between",
    //     marginHorizontal: 15,
    //     borderBottomColor: colors.grey4,
    //     borderBottomWidth: 1,
    //     flex: 1
    // },

    // view6: {


    //     alignItems: "center",
    //     flex: 5,
    //     flexDirection: "row"
    // },
    // view7: {
    //     backgroundColor: colors.grey6,
    //     height: 40,
    //     width: 40,
    //     borderRadius: 20,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginRight: 20

    // },

    // map: {

    //     height: 150,
    //     marginVertical: 0,
    //     width: SCREEN_WIDTH * 0.92
    // },

    // text4: {
    //     fontSize: 20,
    //     color: colors.black,
    //     marginLeft: 20,
    //     marginBottom: 20
    // },

    // icon1: {
    //     marginLeft: 10,
    //     marginTop: 5
    // },

    // view8: {
    //     flex: 4,
    //     marginTop: -25
    // },
    // carsAround: {
    //     width: 28,
    //     height: 14,

    // },

    // location: {
    //     width: 16,
    //     height: 16,
    //     borderRadius: 8,
    //     backgroundColor: colors.blue,
    //     alignItems: "center",
    //     justifyContent: "center"

    // },

    // view9: {
    //     width: 4,
    //     height: 4,
    //     borderRadius: 2,
    //     backgroundColor: "white"
    // }


})