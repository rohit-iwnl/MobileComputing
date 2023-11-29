import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThirdwebProvider,metamaskWallet } from "@thirdweb-dev/react-native";
import RegisterScreen from "./screens/RegisterScreen";
import StudentScreen from "./screens/HomeScreen/StudentScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
        <ThirdwebProvider
      activeChain="mumbai"
      clientId="cfb5750fd32101e1048951d071e61205"
      supportedWallets={[metamaskWallet({recommended: true})]}
    >

      <SafeAreaProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          
        >
          <Stack.Screen name="landingScreen" component={LandingScreen} />
          <Stack.Screen name="registerScreen" component={RegisterScreen} />
          <Stack.Screen name="homeScreen" component={StudentScreen} />
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
