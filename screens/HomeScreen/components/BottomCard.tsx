import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@rneui/base";
import { Web3Button } from "@thirdweb-dev/react-native";
import {
  contractABI,
  contractAddress,
} from "../../../utils/Contracts/constants";

const BottomCard = ({ isCollege }) => {
  const [remarks, setRemarks] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [keyphrase, setKeyphrase] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          {isCollege ? "Issue Document" : "Claim Document"}
        </Text>
        <Text>
          {isCollege
            ? " Enter the wallet address to whom it has to be issued to "
            : "Enter the secret keyphrase that was provided by the institution"}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {isCollege ? (
          <Input
            placeholder="Wallet Address"
            onChangeText={(text) => setStudentAddress(text)}
            style={styles.input}
          />
        ) : (
          <Input
            placeholder="Secret Keyphrase"
            onChangeText={(text) => setKeyphrase(text)}
            style={styles.input}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        {isCollege ? (
          <Input placeholder="Enter Remarks" style={styles.input} />
        ) : (
          <></>
        )}
      </View>
      <View>
        {isCollege ? (
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
        ) : (
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
        )}
      </View>
    </View>
  );
};

export default BottomCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#D8D9DA",
    borderRadius: 20,
    padding: 25,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-around",
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
    borderBottomWidth: 2,
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  claimButton: {
    backgroundColor: "#437eda",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 24,
  },
});
