import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Animated, { withSpring, withTiming } from "react-native-reanimated";
import { interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const GetStarted = ({ flatListRef, flatListIndex, dataLength, x }) => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: width / 20,
      height: height / 20,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, width, 2 * width],
      ["#005b4f", "#F6C90E", "#F15937"]
    );
    return {
      backgroundColor,
    };
  });

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });

  const textButtonAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current.scrollToIndex({
            index: flatListIndex.value + 1,
          });
        } else {
          //Naviagte to the next screen
          navigation.replace("landing");
        }
      }}
    >
      <Animated.View
        style={[
          styles.container,
          animatedColor,
          buttonAnimationStyle,
          { height: height / 15, width: height / 15 },
        ]}
      >
        <Animated.Text style={[styles.textButton, textButtonAnimationStyle]}>
          Continue
        </Animated.Text>
        <Animated.Image
          source={require("../assets/Landing_assets/arrowIcon.png")}
          style={[styles.arrowIcon, arrowAnimationStyle]}
        />
      </Animated.View>
    </Pressable>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
  },
  textButton: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    position: "absolute",
  },
});
