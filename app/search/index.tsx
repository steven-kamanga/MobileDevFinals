import { Box } from "@/components/ui/box";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Text } from "react-native";

const Search = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => (
        <Box className="flex-row items-center">
          {/* Adjust the ml- value as needed */}
          <Input className="w-[95%] ml-[-20px]">
            <InputSlot className="pl-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField placeholder="Search..." />
          </Input>
        </Box>
      ),
    });
  });

  return <Box>{/* Fix the ui */}</Box>;
};

export default Search;
