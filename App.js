import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigations/RootNavigator';
import TrackAmbulanceScreen from './src/screens/TrackAmbulanceScreen';

export default function App() {
  return (
    // <SafeAreaProvider>
    //   <RootNavigator />
    // </SafeAreaProvider>
    <TrackAmbulanceScreen />
  );
}

// TODO: on logout, remove all async storage stuff, stopLocationUpdates