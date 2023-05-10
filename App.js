import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigations/RootNavigator';
import SelectHospitalScreen from './src/screens/SelectHospitalScreen';
import TrackAmbulanceScreen from './src/screens/TrackAmbulanceScreen';

export default function App() {
  return (
    // <SafeAreaProvider>
    //   <RootNavigator />
    // </SafeAreaProvider>
    <TrackAmbulanceScreen />
  );
}

// TODO: add proper fonts
// TODO: on logout, remove all async storage stuff, stopLocationUpdates
