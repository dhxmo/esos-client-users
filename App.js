import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigations/RootNavigator';
import SelectHospitalScreen from './src/screens/SelectHospitalScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
    // <SelectHospitalScreen />
  );
}

// TODO: add proper fonts
// TODO: on logout, remove all async storage stuff, stopLocationUpdates
