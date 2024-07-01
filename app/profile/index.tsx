import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import { Pressable } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [displayName, setdisplayName] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user !== null) {
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid;
      setdisplayName(displayName!);
    }
  }, []);
  return (
    <Box className="flex flex-col items-center">
      <Pressable onPress={() => router.push("/userUpdate/")}>
        <Avatar className="bg-secondary-0 h-16 w-16 ml-2">
          <AvatarFallbackText className=" text-typography-950 text-xs">
            {displayName || "hello"}
          </AvatarFallbackText>
          <AvatarBadge />
        </Avatar>
      </Pressable>
      <Button
        onPress={async () => {
          await auth.signOut();
          try {
            await AsyncStorage.setItem("firebaseIdToken", ""); // Store ID token directly
          } catch (error) {
            console.error("Error storing ID token:", error); // Log specific error details
            // Handle storage errors appropriately (e.g., notify user)
          }
          router.push("/");
        }}
        variant="solid"
        className="mb-5 mt-3 bg-secondary-0 w-56"
        action="secondary"
      >
        <ButtonText className="text-typography-950 ">Logout</ButtonText>
      </Button>
    </Box>
  );
};

export default Profile;
