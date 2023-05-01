import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationScreen from '../screens/LocationScreen';
import TrackAmbulanceScreen from '../screens/TrackAmbulanceScreen';
import OrderAmbulanceScreen from '../screens/OrderAmbulance';
import HomeScreen from '../screens/HomeScreen';

const Main = createNativeStackNavigator();

export function MainStack() {
  return (
    <Main.Navigator>
      <Main.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Main.Screen
        name="location"
        component={LocationScreen}
        options={{ headerShown: false }}
      />
      <Main.Screen
        name="order-ambulance"
        component={OrderAmbulanceScreen}
        options={{ headerShown: false }}
      />
      <Main.Screen
        name="track-ambulance"
        component={TrackAmbulanceScreen}
        options={{ headerShown: false }}
      />
    </Main.Navigator>
  );
}
