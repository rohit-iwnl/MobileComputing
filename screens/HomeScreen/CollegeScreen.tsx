import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../utils/FirebaseConfig";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "@firebase/auth";
import { Button } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicon from "@expo/vector-icons/Ionicons";
import HomeScreenCard from "./components/HomeScreenCard";
import BottomCard from "./components/BottomCard";

const auth = getAuth(app);

const CollegeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState(null);
  const [isInstitution, setIsInstitution] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userUid = auth?.currentUser?.uid;
        console.log("userUid", userUid);

        if (userUid) {
          const firestore = getFirestore(app);
          const docRef = doc(firestore, "users", userUid);
          const docSnap = await getDoc(docRef);
          setUserData(docSnap.data());
          setName(docSnap.data().name);
          if (docSnap.data().isInstitution) setIsInstitution(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const navigateToTransactions = () => {
    console.log(isInstitution)
    if (isInstitution) navigation.navigate("issuedScreen");
    else navigation.navigate("claimedScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "#000",
                marginTop: 10,
              }}
            >
              Welcome
            </Text>
            <Pressable
              onPress={navigateToTransactions}
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Ionicon name="receipt" size={32} color="black" />
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                History
              </Text>
            </Pressable>
          </View>

          <HomeScreenCard userData={name} />
          {/* Bottom Card */}
          <BottomCard isCollege={isInstitution} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CollegeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
