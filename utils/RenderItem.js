import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import AnimatedLottieView from "lottie-react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, } from "react-native-reanimated";

const RenderItem = ({ item, index,x}) => {
  const { width } = Dimensions.get("window");

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ],
      [150, 0, -150],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateY: translateYAnimation}],
    };
  });

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ],
      [1, 4, 4],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
    };
  });
  
  return (
    <View style={[styles.itemContainer, {width: width}]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: width,
              height: width,
              borderRadius: width / 2,
              backgroundColor: item.backgroundColor,
            },
            circleAnimation,
          ]}
        />
      </View>
      <Animated.View style={lottieAnimationStyle}>
        <AnimatedLottieView
          source={item.animation}
          style={{
            width: width * 0.9,
            height: width * 0.9,
          }}
          autoPlay
          loop
        />
      </Animated.View>
      <Text style={[styles.itemText, {color: item.textColor}]}>
        {item.text}
      </Text>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 110,
    marginTop:50,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});