import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const Dot = ({ index, x }) => {
  const { width } = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [10, 20, 10],
      Extrapolate.CLAMP
    );

    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, width, 2 * width],
      ["#005b4f", "#F6C90E", "#F15937"]
    );

    return {
      backgroundColor: backgroundColor,
    };
  });
  return <Animated.View style={[styles.dot, animatedDotStyle,animatedColor]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    width: 12,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 8,
  },
});
