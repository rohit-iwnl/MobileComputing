import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import Ionicon from "@expo/vector-icons/Ionicons";

import {
  useAddress,
  useMetaMaskWallet,
  useLogin,
  useLogout,
  useUser,
  useDisconnect,
} from "@thirdweb-dev/react-native";
import GenerateQR from "./GenerateQR";

const HomeScreenCard = ({ userData }) => {
  const { width, height } = Dimensions.get("window");
  const [address, setAddress] = useState("");

  const connect = useMetaMaskWallet();
  const disconnect = useDisconnect();
  const { login } = useLogin();
  const { logout } = useLogout();
  const { user, isLoggedIn } = useUser();
  const addressFromMetamask = useAddress();

  const checkAddress = () => {
    const addressFromDb = userData.address;
    connect();
    if (addressFromDb !== addressFromMetamask.toString()) {
      Alert.alert(
        "Address mismatch",
        "The address you are trying to connect with is not the same as the one you used to register. Please use the same address to connect.",
        [{ text: "OK" }]
      );
      disconnect();
    }
  };

  return (
    <View style={[styles.cardContainer, { height: height / 4 }]}>
      <View
        style={{
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#000",
            marginTop: 10,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {userData}
        </Text>
        {addressFromMetamask ? (
          <View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#000",
                  marginBottom: 10,
                }}
              >
                Wallet Address
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  marginBottom: 10,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {addressFromMetamask}
              </Text>
            </View>
            <Pressable
              onPress={() => Alert.alert("Use Metamask app to switch wallets")}
            >
              <Text>
                Not the right wallet?
                <Text
                  style={{
                    textDecorationLine: "underline",
                  }}
                >
                  Disconnect
                </Text>
              </Text>
            </Pressable>
          </View>
        ) : (
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
        )}
      </View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></View>
    </View>
  );
};

export default HomeScreenCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 0.6,
    borderRadius: 20,
    backgroundColor: "#F05454",
    width: "100%",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  registerButton: {
    backgroundColor: "#d3d3d3",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  icon: {
    marginRight: 15,
  },
});
