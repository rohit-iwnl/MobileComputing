import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, CheckBox, Input } from "@rneui/base";
import Ionicon from "react-native-vector-icons/Ionicons";
import {
  useAddress,
  useMetaMaskWallet,
  useLogin,
  useLogout,
  useUser,
  useDisconnect,
} from "@thirdweb-dev/react-native";
import { app } from "../utils/FirebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "@firebase/auth";

const auth = getAuth(app);

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const [isInstitution, setIsInstitution] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  const address = useAddress();
  const connect = useMetaMaskWallet();
  const disconnect = useDisconnect();
  const { login } = useLogin();
  const { logout } = useLogout();
  const { user, isLoggedIn } = useUser();

  const handleSignup = async () => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      console.log(signInMethods);
      if (signInMethods && signInMethods.length > 0) {
        Alert.alert("Email already exists");
        return;
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const firestore = getFirestore();
        const usersCollection = collection(firestore, "users");
        const userDocRef = doc(usersCollection, userCredential.user.uid);
        if (secretKey === "CSE536") {
          await setDoc(userDocRef, {
            userId: userCredential.user.uid,
            name: name, // Add other user details you want to store
            email: email,
            walletAddress: "0x",
            isInstitution: true,
            // Add more fields as needed
          }).then(() => {
            Alert.alert("Registration successful");
            navigation.replace("landingScreen");
          });
        } else {
          await setDoc(userDocRef, {
            userId: userCredential.user.uid,
            name: name, // Add other user details you want to store
            email: email,
            walletAddress: address.toString(),
            // Add more fields as needed
          }).then(() => {
            Alert.alert("Registration successful");
            navigation.replace("landingScreen");
          });
        }
      }
    } catch (error) {
      console.log("Registration error:", error.message);
      Alert.alert(error.message.replace("Firebase: ", ""));
    }
  };

  const registerUser = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Please fill all fields");
    } else if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
    } else if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters long");
    } else {
      Alert.alert(`Please confirm your wallet address`, `${address}`, [
        {
          text: "Cancel",
          onPress: () => {
            console.log("cancel");
          },
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: handleSignup,
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        behavior="padding"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Name"
              onChangeText={(e) => {
                setName(e);
              }}
              leftIconContainerStyle={{
                marginRight: 10,
              }}
              leftIcon={<Ionicon name="person-outline" size={24} />}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Email address"
              onChangeText={(e) => {
                setEmail(e);
              }}
              leftIconContainerStyle={{
                marginRight: 10,
              }}
              leftIcon={<Ionicon name="mail-unread-outline" size={24} />}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              onChangeText={(e) => {
                setPassword(e);
              }}
              placeholder="Password"
              secureTextEntry
              leftIconContainerStyle={{
                marginRight: 10,
              }}
              leftIcon={<Ionicon name="keypad-outline" size={24} />}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              onChangeText={(e) => {
                setConfirmPassword(e);
              }}
              placeholder="Confirm Password"
              secureTextEntry
              leftIconContainerStyle={{
                marginRight: 10,
              }}
              leftIcon={<Ionicon name="keypad-outline" size={24} />}
            />
          </View>
          <View style={styles.inputContainer}>
            <CheckBox
              center
              title="Are you an document providing institution?"
              checked={isInstitution}
              onPress={() => setIsInstitution(!isInstitution)}
            />
          </View>
          {isInstitution ? (
            <View style={styles.inputContainer}>
              <Input
                placeholder="Secret key"
                onChangeText={(text) => setSecretKey(text)}
              />
            </View>
          ) : (
            <></>
          )}
          {!address ? (
            <></>
          ) : (
            <View>
              <Text
                style={{ marginBottom: 10, fontSize: 16, fontWeight: "500" }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Wallet Address: {address}
              </Text>
            </View>
          )}
          {!address ? (
            <Button
              title="Connect your wallet"
              type="clear"
              icon={
                <Ionicon name="wallet-outline" size={22} style={styles.icon} />
              }
              titleStyle={{
                color: "black",
                fontSize: 18,
                fontWeight: "bold",
              }}
              onPress={() => connect()}
              containerStyle={styles.registerButton}
            />
          ) : (
            <Button
              title="Disconnect"
              type="clear"
              icon={
                <Ionicon name="wallet-outline" size={22} style={styles.icon} />
              }
              titleStyle={{
                color: "black",
                fontSize: 18,
                fontWeight: "bold",
              }}
              onPress={() => disconnect()}
              containerStyle={styles.registerButton}
            />
          )}
          {address ? (
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
          ) : (
            <></>
          )}
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

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    padding: 10,
    borderBottomColor: "#fff",
    fontSize: 16,
  },
  addressContainer: {
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: "#d3d3d3",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 20,
  },
});
