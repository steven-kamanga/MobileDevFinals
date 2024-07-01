import React, { useEffect, useState } from "react";
import { Box } from "./ui/box";
import { Avatar, AvatarBadge, AvatarFallbackText } from "./ui/avatar";
import { Icon, SearchIcon, SettingsIcon } from "./ui/icon";
import { Pressable, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { auth } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const HeadTile = () => {
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
    <Box className="h-[70px] px-3 mb-2 mt-5 w-full flex-row items-end">
      <Box className="flex-row w-full items-center justify-between">
        <Pressable onPress={() => router.push("/profile")}>
          <Avatar className="bg-secondary-0 h-10 w-10 ml-2">
            <AvatarFallbackText className=" text-typography-950 text-xs">
              {displayName || "John"}
            </AvatarFallbackText>
            <AvatarBadge />
          </Avatar>
        </Pressable>

        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/settings",
            });
          }}
          className="items-center justify-center rounded-full h-[35px] w-[35px]"
        >
          <Icon as={SettingsIcon} className="text-typography-0 h-6 w-6" />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default HeadTile;
