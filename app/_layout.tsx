// RootLayout.tsx or index.tsx
import "../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { Text, useColorScheme } from "react-native";
import { GluestackUIStyledProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Box } from "@/components/ui/box";
import useThemeMode from "@/hooks/useThemeMode";

const RootLayout = () => {
  const uiState = useThemeMode();
  const colorScheme = useColorScheme();

  return (
    <Box className={`flex-1 ${uiState === "light" ? "bg-black" : "bg-white"}`}>
      <Provider store={store}>
        <GluestackUIStyledProvider config={config}>
          <GluestackUIProvider mode={uiState}>
            <ThemeProvider
              value={colorScheme === uiState ? DarkTheme : DefaultTheme}
            >
              <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  options={{
                    headerShadowVisible: false,
                    headerShown: true,
                    headerTitle: () => (
                      <Text className=" text-secondary-0 font-medium"></Text>
                    ),
                  }}
                  name="event-details/[id]"
                />
                <Stack.Screen
                  options={{
                    headerShadowVisible: false,
                    headerTitle: () => (
                      <Text className=" text-secondary-0 font-medium">
                        Search
                      </Text>
                    ),
                  }}
                  name="search/index"
                />
                <Stack.Screen
                  options={{
                    headerShadowVisible: false,
                    headerTitle: () => (
                      <Text className=" text-secondary-0 font-medium">
                        Register
                      </Text>
                    ),
                  }}
                  name="register/index"
                />
                <Stack.Screen
                  options={{
                    headerShadowVisible: false,
                    headerBackground: () => (
                      <Box className="flex-1 h-screen flex-col items-end justify-end bg-primary-950" />
                    ),
                    headerTitle: () => (
                      <Text className=" text-secondary-0 font-medium"></Text>
                    ),
                  }}
                  name="index"
                />
              </Stack>
            </ThemeProvider>
          </GluestackUIProvider>
        </GluestackUIStyledProvider>
      </Provider>
    </Box>
  );
};

export default RootLayout;
