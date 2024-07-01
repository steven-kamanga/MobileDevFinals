import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Switch } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { Icon, MoonIcon, SunIcon } from "@/components/ui/icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventRegister } from "react-native-event-listeners";
import useThemeMode from "@/hooks/useThemeMode"; // Import the custom hook

const Settings = () => {
  const uiState = useThemeMode(); // Use the custom hook to get the theme mode
  const [isToggled, setIsToggled] = useState(uiState === "dark");

  const storeData = async (value: boolean) => {
    try {
      const stringValue = value ? "true" : "false";
      await AsyncStorage.setItem("colorMode", stringValue);
    } catch (e) {
      setIsToggled(false);
    }
  };

  const handleToggleChange = (toggleValue: boolean) => {
    setIsToggled(toggleValue);
    storeData(toggleValue);
    EventRegister.emit("theme-changed", toggleValue ? "dark" : "light");
  };

  useEffect(() => {
    setIsToggled(uiState === "dark");
  }, [uiState]);

  return (
    <Box>
      <HStack className="flex items-center">
        <Switch onToggle={handleToggleChange} value={isToggled} />
        {isToggled ? (
          <Icon as={SunIcon} className="text-typography-0 m-2 w-5 h-5" />
        ) : (
          <Icon as={MoonIcon} className="text-typography-0 m-2 w-5 h-5" />
        )}
      </HStack>
    </Box>
  );
};

export default Settings;
