import AnimatedFab from "@/components/Animated.fab";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { checkImageURL } from "@/utils";
import { useNavigation, useLocalSearchParams } from "expo-router";
import React, { useLayoutEffect } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const EventDetails = () => {
  const { id, image, name } = useLocalSearchParams<{
    id: string;
    image: string;
    name: string;
  }>();

  return (
    <Box className="flex-1 bg-primary-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Box className="w-full flex flex-col">
          <Image
            className="flex w-full h-96"
            source={{
              uri: image,
            }}
          />
        </Box>
        <Divider className="mt-5 w-[70%]"></Divider>
        <Text className="text-typography-0 mb-4">{name}</Text>
        <Text className="text-typography-0">{name} Details</Text>
      </ScrollView>
      <Box className="flex-row w-full justify-end absolute bottom-0 p-4">
        <AnimatedFab form_id={id || ""} />
      </Box>
    </Box>
  );
};

export default EventDetails;
