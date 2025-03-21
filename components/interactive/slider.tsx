import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Colors } from "@/styles/Colors";

interface SliderProps {
  onChange?: (isActive: boolean) => void;
  defaultValue?: boolean;
}

const Slider = ({ onChange, defaultValue = false }: SliderProps) => {
  const [isActive, setIsActive] = useState(defaultValue);
  const [animation] = useState(new Animated.Value(defaultValue ? 1 : 0));

  const toggleSlider = () => {
    const toValue = isActive ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 100,
      useNativeDriver: false,
    }).start();

    const newState = !isActive;
    setIsActive(newState);
    onChange?.(newState);
  };

  const circlePosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 26],
  });

  const pillBackgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.greyBorderDimm, Colors.primary],
  });

  return (
    <TouchableOpacity onPress={toggleSlider} activeOpacity={0.8}>
      <Animated.View
        style={[
          styles.pill,
          { backgroundColor: pillBackgroundColor },
        ]}
      >
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ translateX: circlePosition }] },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    width: 62,
    height: 36,
    borderRadius: 36,
    justifyContent: "center",
    padding: 4,
  },
  circle: {
    right: 2,
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: Colors.background,
  },
});

export default Slider;