import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from "../screens/MainScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LogInScreen";
import LocationScreen from '../screens/LocationScreen';
import HomeScreen from '../screens/HomeScreen';
import TrackAmbulanceScreen from '../screens/TrackAmbulanceScreen';

const Main = createNativeStackNavigator();

export function MainStack() {
    return (
        <Main.Navigator>
            <Main.Screen
                name="main"
                component={MainScreen}
                options={{ headerShown: false }}
            />
            <Main.Screen
                name="register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Main.Screen
                name="login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Main.Screen
                name="location"
                component={LocationScreen}
                options={{ headerShown: false }}
            />
            <Main.Screen
                name="home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Main.Screen
                name="track-ambulance"
                component={TrackAmbulanceScreen}
                options={{ headerShown: false }}
            />
        </Main.Navigator>
    )
}