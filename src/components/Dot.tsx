import { View, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  index: number;
  x: SharedValue<number>;
};

const Dot = ({ index, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  // animate width and opacity of dot
  const dotAnimationStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [10, 20, 10],
      Extrapolate.CLAMP
    );

    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  const backgroundColorAnimationStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["#005b4f", "#1e2169", "#F15937"]
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Animated.View
      style={[styles.dot, dotAnimationStyle, backgroundColorAnimationStyle]}
    />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    // width: 10,
    height: 10,
    borderRadius: 5,
    // backgroundColor: "black",
    marginHorizontal: 10,
  },
});
