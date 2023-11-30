import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@rneui/base";
import {
  Web3Button,
  useAddress,
  useDisconnect,
} from "@thirdweb-dev/react-native";
import {
  contractABI,
  contractAddress,
} from "../../../utils/Contracts/constants";
import { app } from "../../../utils/FirebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

const BottomCard = ({ isCollege }) => {
  const [remarks, setRemarks] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [keyphrase, setKeyphrase] = useState("");
  const [txnResultHash, setTxnResultHash] = useState("");

  const address = useAddress();
  const disconnect = useDisconnect();

  const handleAction = async (contract) => {
    const result = await contract.call("issueDegree", [studentAddress]);
    const txnHash = result.receipt?.transactionHash;
    console.log(`Inside Action:${txnHash}`);
    setTxnResultHash(txnHash);
  };

  const handleActionStudent = async (contract) => {
    const result = await contract.call("claimDegree", [keyphrase]);
    const txnHash = result.receipt?.transactionHash;
    console.log(`Inside Action:${txnHash}`);
    setTxnResultHash(txnHash);
  };

  const postTransactionToFirebase = async () => {
    try {
      const firestore = getFirestore(app);
      const transactionsCollection = collection(
        firestore,
        auth?.currentUser?.uid
      );
      const date = new Date();

      if (!txnResultHash) return;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      if (isCollege) {
        await addDoc(transactionsCollection, {
          userId: auth?.currentUser?.uid,
          issueDate: `${month}/${day}/${year}`,
          toAddress: studentAddress,
          fromAddress: address.toString(),
          remarks: remarks,
          transactionHash: txnResultHash,
        });
      } else {
        await addDoc(transactionsCollection, {
          userId: auth?.currentUser?.uid,
          issueDate: `${month}/${day}/${year}`,
          toAddress: address.toString(),
          fromAddress: contractAddress.toString(),
          remarks: remarks,
          transactionHash: txnResultHash,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    postTransactionToFirebase();
    console.log(`Inside useEffect:${txnResultHash}`);
  }, [txnResultHash]);

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
            onChangeText={(text) =>
              setKeyphrase(`https://ipfs.io/ipfs/${text}`)
            }
            style={styles.input}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Input
          onChangeText={(text) => setRemarks(text)}
          placeholder="Enter Remarks"
          style={styles.input}
        />
      </View>
      <View>
        {isCollege ? (
          <Web3Button
            contractAddress={contractAddress}
            contractAbi={contractABI}
            action={handleAction}
            onSuccess={() => {
              Alert.alert("Success", "Degree Issued");
              console.log(`Inside Success:${txnResultHash}`);
            }}
            onError={(e) => {
              console.log(e);
            }}
          >
            Issue Document
          </Web3Button>
        ) : (
          <Web3Button
            contractAddress={contractAddress}
            contractAbi={contractABI}
            action={handleActionStudent}
            onSuccess={() => {
              Alert.alert("Success", "Degree Claimed");
              console.log(`Inside Success:${txnResultHash}`);
            }}
            onError={(e) => {
              console.log(e.message);
              Alert.alert("Transaction Error","Please check if you have already claimed the document");
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
