import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Web3Button,
  useAddress,
  useMetaMaskWallet,
  useDisconnect,
} from "@thirdweb-dev/react-native";
import { contractAddress, contractABI } from "../../utils/Contracts/constants";
import { Input, Button } from "@rneui/base";
import Ionicon from "@expo/vector-icons/Ionicons";

const StudentScreen = () => {
  const [keyphrase, setKeyphrase] = React.useState("https://ipfs.io/ipfs/");
  const [studentAddress, setStudentAddress] = React.useState("");

  const address = useAddress();
  const connect = useMetaMaskWallet();
  const disconnect = useDisconnect();

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.content}>
          <Text>Student Screen</Text>
          <View style={styles.inputContainer}>
            <Input
              onChangeText={(e) => {
                setKeyphrase(`https://ipfs.io/ipfs/${e}`);
              }}
              placeholder="Secret Keyphrase "
              leftIcon={<Ionicon name="wallet-outline" size={22} />}
              leftIconContainerStyle={{
                marginRight: 10,
              }}
            />
          </View>
          <Button
            title="Check inputs"
            style={{
              marginBottom: 10,
            }}
            onPress={() => {
              console.log(studentAddress);
              console.log(keyphrase);
            }}
          />
          <Web3Button
            contractAddress={contractAddress}
            contractAbi={contractABI}
            action={(contract) => contract.call("claimDegree", [keyphrase])}
            onSuccess={() => {
              Alert.alert("Success", "Degree Claimed");
            }}
            onError={(e) => {
              console.log(e);
              Alert.alert("Error", "Degree Not Claimed");
            }}
          >
            Claim Document
          </Web3Button>
        </View>
        <View style={styles.content}>
          <Text>College Screen</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Student Address"
              onChangeText={(e) => {
                setStudentAddress(e);
              }}
              leftIcon={<Ionicon name="wallet-outline" size={22} />}
              leftIconContainerStyle={{
                marginRight: 10,
              }}
            />
          </View>
          <Web3Button
            contractAddress={contractAddress}
            contractAbi={contractABI}
            action={(contract) =>
              contract.call("issueDegree", [studentAddress])
            }
            onSuccess={() => {
              Alert.alert("Success", "Degree Issued");
            }}
            onError={(e) => console.log(e)}
          >
            Issue Document
          </Web3Button>
          <View
            style={{
              marginTop: 50,
            }}
          >
            <Text>Current Wallet Address: {address}</Text>
          </View>
          <View
            style={{
              marginTop: 50,
            }}
          >
            {!address ? (
              <Button
                title="Connect your wallet"
                type="clear"
                icon={
                  <Ionicon
                    name="wallet-outline"
                    size={22}
                    style={styles.icon}
                  />
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
                  <Ionicon
                    name="wallet-outline"
                    size={22}
                    style={styles.icon}
                  />
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
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    paddingHorizontal: 30,
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
  registerButton: {
    backgroundColor: "#d3d3d3",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 20,
  },
});
