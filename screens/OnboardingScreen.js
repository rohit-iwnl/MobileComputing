import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import animationData from "../utils/AnimationData";
import RenderItem from "../utils/RenderItem";
import Pagination from "../utils/Pagination";
import GetStarted from "../utils/GetStarted";

const OnboardingScreen = () => {
  const flatListRef = useAnimatedRef();
  const navigation = useNavigation();
  const flatListIndex = useSharedValue(0);
  const x = useSharedValue(0);
  const { width, height } = Dimensions.get("window");

  const onScrollEvent = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={animationData}
        onScroll={onScrollEvent}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} x={x} />;
        }}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
          minimumViewTime: 300,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={animationData} x={x} />
        <GetStarted
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={animationData.length}
          x={x}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
