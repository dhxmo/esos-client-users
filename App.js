import RootNavigator from './src/navigations/RootNavigator';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <RootNavigator />
    // <OriginContextProvider>
    // </OriginContextProvider>
  );
}
