import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './StackNavigation';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
