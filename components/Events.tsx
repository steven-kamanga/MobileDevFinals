import React, { useState, useEffect } from "react";
import { FlatList, View, Text, Image, Pressable } from "react-native"; // Assuming you're using React Native
import { Box } from "./ui/box";
import AnimatedFab from "./Animated.fab";
import { router } from "expo-router";

const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([]); // Set initial state type

  useEffect(() => {
    const generateLocations = () => {
      const newLocations: Location[] = []; // Use the explicit type

      // Generate random location names (replace with your preferred logic)
      for (let i = 0; i < 5; i++) {
        // Adjust to desired number of locations
        const randomLocation = `Location ${i + 1}`; // Placeholder names
        newLocations.push({ name: randomLocation, key: i.toString() }); // Add unique keys
      }

      setLocations(newLocations);
    };

    generateLocations();
  }, []);

  const renderItem = ({ item }: any) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/event-details/[id]`,
          params: {
            id: item.key,
            name: item.name,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Atari_Computer_Program_Cassette_Joystick_Sketchpad_TX_9032.jpg/640px-Atari_Computer_Program_Cassette_Joystick_Sketchpad_TX_9032.jpg",
          },
        })
      }
    >
      <View className="flex p-5 flex-row w-full">
        <Box className="w-full flex flex-col">
          <Image
            className="flex w-full h-48 rounded-lg"
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Atari_Computer_Program_Cassette_Joystick_Sketchpad_TX_9032.jpg/640px-Atari_Computer_Program_Cassette_Joystick_Sketchpad_TX_9032.jpg",
            }}
          />
          <Text className="text-typography-0">{item.name}</Text>
        </Box>
      </View>
    </Pressable>
  );

  return (
    <>
      <FlatList
        ListHeaderComponent={() => (
          <Text className="p-5 text-typography-0">Hotels & Reservations</Text>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item) => item.key} // Ensure unique keys for each item
      />
    </>
  );
};

export default Locations;

interface Location {
  // Define an interface for type safety
  name: string;
  key: string;
}
