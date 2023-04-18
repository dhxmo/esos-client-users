import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from "../screens/MainScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LogInScreen";

const Main = createNativeStackNavigator();

export function MainStack() {
    return (
        <Main.Navigator>
            <Main.Screen
                name="home"
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
        </Main.Navigator>
    )
}