import { Box } from "@/components/ui/box";
import HeadTile from "@/components/Head.tile";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import HeadTileTabs from "@/components/Tabs";
import { Text } from "react-native";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import Locations from "@/components/Events";

export default function Home() {
  const [uiState, setUiState] = useState<"light" | "dark">("light");

  const getData = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("colorMode");
      if (stringValue !== null) {
        const value = stringValue === "true";
        setUiState(value ? "dark" : "light");
      }
    } catch (e) {
      setUiState("light");
    }
  };

  useEffect(() => {
    getData();
    const listener = EventRegister.addEventListener(
      "theme-changed",
      (themeMode: "light" | "dark") => {
        setUiState(themeMode);
      }
    );
    return () => {
      if (typeof listener === "string") {
        EventRegister.removeEventListener(listener);
      }
    };
  }, []);

  return (
    <Box className="flex-1 bg-primary-950 flex-col  items-start">
      <HeadTile />
      <Box>
        <Locations />
        {/* Recommended Destinations */}
      </Box>

      <StatusBar style={uiState} />
    </Box>
  );
}
