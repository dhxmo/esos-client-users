import RootNavigator from './src/navigations/RootNavigator';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <HomeScreen />
    // <RootNavigator />
    // <OriginContextProvider>
    // </OriginContextProvider>
  );
}
