import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigations/RootNavigator';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
    // <OriginContextProvider>
    // </OriginContextProvider>
  );
}
