import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventRegister } from "react-native-event-listeners";

const useThemeMode = () => {
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

  return uiState;
};

export default useThemeMode;
