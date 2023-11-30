import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react-native";
import RegisterScreen from "./screens/RegisterScreen";
import StudentScreen from "./screens/HomeScreen/StudentScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CollegeScreen from "./screens/HomeScreen/CollegeScreen";
import IssuedScreen from "./screens/Transactions/IssuedScreen";
import ClaimedScreen from "./screens/Transactions/ClaimedScreen";

const Stack = createNativeStackNavigator();

export const globalContext = React.createContext();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <ThirdwebProvider
        activeChain="mumbai"
        clientId="cfb5750fd32101e1048951d071e61205"
        supportedWallets={[metamaskWallet({ recommended: true })]}
      >
        <SafeAreaProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            
          >
            {isFirstLaunch && (
              <Stack.Screen
                name="onboardingScreen"
                component={OnboardingScreen}
              />
            )}
            <Stack.Screen name="landingScreen" component={LandingScreen} />
            <Stack.Screen name="registerScreen" component={RegisterScreen} />
            <Stack.Screen name="homeScreen" component={StudentScreen} />
            <Stack.Screen name="collegeScreen" component={CollegeScreen} />
            <Stack.Screen name="issuedScreen" component={IssuedScreen} />
            <Stack.Screen name="claimedScreen" component={ClaimedScreen} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </ThirdwebProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
