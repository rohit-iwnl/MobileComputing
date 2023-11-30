import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RenderFlatList = ({ item }) => {
  return (
    <View style={styles.listContent}>
      <View style={styles.itemContainer}>
        <Text style={styles.remarksText} numberOfLines={1} ellipsizeMode="tail">Remarks: {item.Remarks}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between",marginBottom:10,}}>
          <View >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
              }}
            numberOfLines={1} ellipsizeMode="tail">
              To:{" "}{item.toAddress}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
              }} numberOfLines={1} ellipsizeMode="tail"
            >
              From:{" "}{item.fromAddress}
            </Text>
          </View>
          <View>
            <Text style={{fontSize:18}}>Issued on</Text>
            <Text style={{fontSize:18,fontWeight:'500'}}>{item.issueDate}</Text>
          </View>
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
              fontSize:16
            }} 
          >
            {item.hash}
          </Text>
        </Text>
      </View>
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
