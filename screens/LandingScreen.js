import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Input, Button } from "@rneui/base";
import Ionicon from "@expo/vector-icons/Ionicons";
import { app } from "../utils/FirebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "@firebase/auth";
const auth = getAuth(app);
import {
  useAddress,
  useMetaMaskWallet,
  useLogin,
  useLogout,
  useUser,
} from "@thirdweb-dev/react-native";

const LandingScreen = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const address = useAddress();
  const connect = useMetaMaskWallet();
  const { login } = useLogin();
  const { logout } = useLogout();
  const { user, isLoggedIn } = useUser();

  const loginFn = () => {
    if (emailAddress === "" || password === "") {
      Alert.alert("Please fill all fields");
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, emailAddress, password);
      navigation.replace("collegeScreen");
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Incorrect Credentials. Please try again.");
    }
  };

  const registerUser = () => {
    navigation.push("registerScreen");
  };

  const checkIfUserExists = async () => {
    const authcheck = getAuth(app);
    let signInMethods = await fetchSignInMethodsForEmail(
      authcheck,
      emailAddress
    );
    console.log(signInMethods);
    if (signInMethods && signInMethods.length > 0) {
      console.log(signInMethods);
    } else {
      Alert.alert("Email does not exist");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.inputContainer}>
            <Input
              onChangeText={(e) => {
                setEmailAddress(e);
              }}
              placeholder="Email Address "
              leftIcon={<Ionicon name="mail-outline" size={22} />}
              leftIconContainerStyle={{
                marginRight: 10,
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              onChangeText={(e) => {
                setPassword(e);
              }}
              secureTextEntry={true}
              placeholder="Password"
              leftIcon={<Ionicon name="key-outline" size={22} />}
              leftIconContainerStyle={{
                marginRight: 10,
              }}
            />
          </View>
          <View>
            <Pressable
              onPress={() => {
                if (
                  emailAddress === "" ||
                  !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailAddress)
                ) {
                  Alert.alert("Please enter a valid email address");
                } else {
                  Alert.alert(
                    `Please confirm your email address`,
                    `${emailAddress}`,
                    [
                      {
                        text: "Cancel",
                        onPress: () => {
                          console.log("cancel");
                        },
                        style: "cancel",
                      },
                      {
                        text: "Confirm",
                        style: "confirm",
                        onPress: () => {
                          sendPasswordResetEmail(auth, emailAddress)
                            .then(() => {
                              Alert.alert(
                                "Password reset email sent",
                                "if the email address is registered, you will receive an email shortly."
                              );
                            })
                            .catch((error) => {
                              Alert.alert(
                                "Password reset email failed to send",
                                error.message
                              );
                            });
                        },
                      },
                    ]
                  );
                }
              }}
              style={{ alignSelf: "flex-end" }}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Pressable>
          </View>
          <Button
            title="Login"
            type="clear"
            titleStyle={{
              color: "white",
              fontSize: 18,
            }}
            onPress={loginFn}
            containerStyle={styles.loginButton}
          />
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>
          <Button
            title="Register"
            type="clear"
            icon={
              <Ionicon
                name="person-add-outline"
                size={22}
                style={styles.icon}
              />
            }
            titleStyle={{
              color: "black",
              fontSize: 18,
              fontWeight: "bold",
            }}
            onPress={registerUser}
            containerStyle={styles.registerButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    position: "relative",
  },
  icon: {
    marginRight: 15,
  },
  input: {
    borderBottomWidth: 1.5,
    flex: 1,
    paddingBottom: 10,
    borderBottomColor: "#fff",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#437eda",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  forgotPassword: {
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  orLine: {
    height: 1,
    backgroundColor: "black",
    flex: 1,
  },
  orText: {
    color: "black",
    marginHorizontal: 8,
    fontSize: 18,
  },
  registerButton: {
    backgroundColor: "#d3d3d3",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
  },
});
