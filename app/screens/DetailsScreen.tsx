import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WeatherData } from "../../constants/types/weather";
import { useTheme } from "../../app/context/ThemeContext";
import WeatherCard from "../../components/WeatherCard";

const DetailsScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const { theme } = useTheme();
  const weatherData: WeatherData = useMemo(
    () => JSON.parse(params.weatherData as string),
    [params.weatherData]
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <WeatherCard weatherData={weatherData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default DetailsScreen;
