import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigations/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}

// TODO: on logout, remove all async storage stuff, stopLocationUpdates
