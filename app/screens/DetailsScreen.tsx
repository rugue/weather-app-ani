import React, { useMemo } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WeatherData } from "../../constants/types/weather";
import { useTheme } from "../../app/context/ThemeContext";
import WeatherCard from "../../components/WeatherCard";
import { useOrientation } from "../../hooks/useOrientation";

const { width, height } = Dimensions.get("window");

const DetailsScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const { theme } = useTheme();
  const orientation = useOrientation();
  const weatherData: WeatherData = useMemo(
    () => JSON.parse(params.weatherData as string),
    [params.weatherData]
  );

  const containerStyle = [
    styles.container,
    { backgroundColor: theme.backgroundColor },
    orientation === "LANDSCAPE" && styles.landscapeContainer,
  ];

  const contentContainerStyle = [
    styles.contentContainer,
    orientation === "LANDSCAPE" && styles.landscapeContentContainer,
  ];

  return (
    <View style={containerStyle}>
      <ScrollView
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <WeatherCard weatherData={weatherData} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  landscapeContainer: {
    flexDirection: "row",
  },
  landscapeContentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },
});

export default DetailsScreen;
