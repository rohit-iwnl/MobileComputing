import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { app } from "../../utils/FirebaseConfig";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { getAuth } from "@firebase/auth";
import RenderFlatList from "./components/RenderFlatList";

const auth = getAuth(app);

const ClaimedScreen = ({ navigation }) => {
  const [txnData, setTxnData] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Issued Documents",
      headerShown: true,
      headerTitleAlign: "center",
      headerTitleStyle: {
        color: "#000",
      },
      headerStyle: {
        backgroundColor: "#fff",
      },
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userUid = auth?.currentUser?.uid;

        if (userUid) {
          const firestore = getFirestore(app);
          const querySnapshot = await getDocs(
            collection(firestore, userUid)
          );
          const transactions = querySnapshot.docs.map((doc) => doc.data());

          setTxnData(transactions);
          console.log(transactions);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <View style={styles.content}>
      <FlatList
        data={txnData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={RenderFlatList}
      />
    </View>
  );
};

export default ClaimedScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  content: {
    padding: 10,
  },
  item: {
    width: "100%",
    marginVertical: 8,
    borderRadius: 16,
    padding: 10,
    backgroundColor: "red",
  },
});
