import HomeScreen from './src/screens/HomeScreen';
import LogInScreen from './src/screens/LogInScreen';
import MainScreen from './src/screens/MainScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    // <HomeScreen />

    <MainScreen />
    // <LogInScreen />
    // <RegisterScreen />
  );
}
