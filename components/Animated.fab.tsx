import React, { useState, useRef } from "react";
import { Animated, Text, TouchableWithoutFeedback } from "react-native";
import { AddIcon, EditIcon, Icon } from "./ui/icon";
import { Divider } from "./ui/divider";
import { router } from "expo-router";

const AnimatedFab = ({ form_id }: { form_id: string }) => {
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setOpen(!open);
  };

  const simpleFormStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
        }),
      },
    ],
  };
  const advancedFormStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -85],
        }),
      },
    ],
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  const increaseBackgroundSize = {
    width: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [41, 155],
    }),
  };

  return (
    <TouchableWithoutFeedback onPress={toggleMenu}>
      <Animated.View
        style={increaseBackgroundSize}
        className="flex-row h-12 items-center justify-end rounded-full bg-secondary-0"
      >
        <TouchableWithoutFeedback
          className="w-16 h-6"
          onPress={() => {
            router.push({
              pathname: "/register",
              params: {
                type: "activity",
                form_id: form_id,
              },
            });
            toggleMenu();
          }}
        >
          <Animated.View
            style={advancedFormStyle}
            className="absolute rounded-full flex-row items-center w-16 justify-center h-6"
          >
            <Text className="pr-2 text-xs text-typography-950">Activity</Text>
            <Divider orientation={"vertical"} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            router.push({
              pathname: "/register",
              params: {
                type: "accomodation",
                form_id: form_id,
              },
            });
            toggleMenu();
          }}
        >
          <Animated.View
            style={simpleFormStyle}
            className="absolute rounded-full flex-row items-center w-16 justify-center h-6"
          >
            <Text className="pr-2 text-xs text-typography-950">Accomod.</Text>
            <Divider orientation={"vertical"} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={rotation}
          className="rounded-full flex pl-[3px] items-center justify-center z-20 h-[42px] w-[42px]"
        >
          {open ? (
            <Icon as={AddIcon} className="text-typography-950 w-7 h-7" />
          ) : (
            <Icon as={EditIcon} className="text-typography-950 w-5 h-5" />
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedFab;
