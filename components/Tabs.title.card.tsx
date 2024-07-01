import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Box } from "./ui/box";
import { TabsTileCardProps } from "@/interfaces";

const TabsTileCard = ({
  name,
  icon,
  buttonpress,
  selected,
}: TabsTileCardProps) => {
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={buttonpress}>
      <Box
        className={`px-3 mx-[2px] flex-row items-center h-[30px] rounded-full ${
          selected ? " bg-info-400" : "bg-gray-300"
        }`}
      >
        <Box className="pr-1">
          <Icon name={icon} color={selected ? "#FFFFFF" : "#000000"} />
        </Box>
        <Text className={`text-${selected ? "white" : "black"} text-sm`}>
          {name}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default TabsTileCard;
