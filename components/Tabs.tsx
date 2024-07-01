// HeadTileTabs.tsx
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import TabsTileCard from "./Tabs.title.card";
import { Box } from "./ui/box";
import { EventRegister } from "react-native-event-listeners";

const HeadTileTabs = () => {
  const [selectedTab, setSelectedTab] = useState("Recommended");

  const handleRecommendedTabClick = () => {
    setSelectedTab("Recommended");
    EventRegister.emit("set-tab-name", "recommended");
  };

  const handleLatestTabClick = () => {
    setSelectedTab("Upcoming");
    EventRegister.emit("set-tab-name", "upcoming");
  };

  return (
    <Box className="bg-transparent h-9 px-3 mb-1">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box className="flex-row justify-between w-full">
          <TabsTileCard
            name={"Recommended"}
            icon={"rocket"}
            buttonpress={handleRecommendedTabClick}
            selected={selectedTab === "Recommended"}
          />
          <TabsTileCard
            name={"Upcoming"}
            icon={"new-releases"}
            buttonpress={handleLatestTabClick}
            selected={selectedTab === "Upcoming"}
          />
          <TabsTileCard
            name={"All Events"}
            icon={"date-range"}
            buttonpress={handleLatestTabClick}
            selected={selectedTab === "Upcoming"}
          />
          <TabsTileCard
            name={"Favourites"}
            icon={"star"}
            buttonpress={handleLatestTabClick}
            selected={selectedTab === "Upcoming"}
          />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default HeadTileTabs;
