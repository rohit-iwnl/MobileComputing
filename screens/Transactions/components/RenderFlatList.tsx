import { StyleSheet, Text, View, Linking, Pressable } from "react-native";
import React from "react";

const RenderFlatList = ({ item }) => {
  const handlePress = () => {
    const url = `https://mumbai.polygonscan.com/tx/${item.transactionHash}`;
    Linking.openURL(url);
  };
  return (
    <View style={styles.listContent}>
      <Pressable onPress={handlePress}>
        <View style={styles.itemContainer}>
          <Text
            style={styles.remarksText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Remarks: {item.Remarks}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                To: {item.toAddress}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                From: {item.fromAddress}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 18 }}>Issued on</Text>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {item.issueDate}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Transaction Hash :{" "}
            <Text
              style={{
                color: "grey",
                fontSize: 16,
              }}
            >
              {item.transactionHash}
            </Text>
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default RenderFlatList;

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    marginVertical: 8,
    borderRadius: 16,
    padding: 10,
    backgroundColor: "#D8D9DA",
  },
  remarksText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContent: {
    padding: 15,
  },
});
