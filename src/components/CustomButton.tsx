import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { OnboardingData } from "../data/data";
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  flatlistRef: any;
  flatlistIndex: SharedValue<number>;
  dataLength: number;
  x: SharedValue<number>;
};

const CustomButton = ({ flatlistRef, flatlistIndex, dataLength, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatlistIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });
  const animatedColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, SCREEN_WIDTH * 2],
      ["#005b4f", "#1e2169", "#F15937"]
    );
    return {
      backgroundColor: backgroundColor,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatlistIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatlistIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const buttonTextAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatlistIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatlistIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatlistIndex.value < dataLength - 1) {
          flatlistRef.current?.scrollToIndex({
            index: flatlistIndex.value + 1,
            animated: true,
          });
        } else {
        }
      }}
    >
      <Animated.View
        style={[styles.container, animatedColorStyle, buttonAnimationStyle]}
      >
        <Animated.Text style={[styles.buttonText, buttonTextAnimationStyle]}>
          Get Started
        </Animated.Text>
        <Animated.Image
          source={require("../../assets/images/ArrowIcon.png")}
          style={[styles.arrowIcon, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    overflow: "hidden",
  },
  arrowIcon: {
    position: "absolute",
    width: 30,
    height: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    position: "absolute",
  },
});
