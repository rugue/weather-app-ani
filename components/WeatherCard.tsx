import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { WeatherData } from "../constants/types/weather";
import { useTheme } from "../app/context/ThemeContext";
import { useOrientation } from "../hooks/useOrientation";

interface WeatherCardProps {
  weatherData: WeatherData;
}

const { width } = Dimensions.get("window");

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { theme } = useTheme();
  const orientation = useOrientation();
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    },
  });

  const cardStyle =
    orientation === "LANDSCAPE" ? styles.cardLandscape : styles.cardPortrait;

  return (
    <Animated.View
      style={[
        styles.card,
        cardStyle,
        { backgroundColor: theme.cardBackground },
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={[styles.city, { color: theme.textColor }]}>
        {weatherData.name}
      </Text>
      <Text style={[styles.temperature, { color: theme.textColor }]}>
        {Math.round(weatherData.main.temp)}°C
      </Text>
      <Text style={[styles.description, { color: theme.textColor }]}>
        {weatherData.weather[0].description}
      </Text>
      <View style={styles.detailsContainer}>
        <Text style={[styles.details, { color: theme.textColor }]}>
          Humidity: {weatherData.main.humidity}%
        </Text>
        <Text style={[styles.details, { color: theme.textColor }]}>
          Wind Speed: {weatherData.wind.speed} m/s
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width - 40,
    alignItems: "center",
  },
  cardPortrait: {
    width: Dimensions.get("window").width - 40,
  },
  cardLandscape: {
    width: Dimensions.get("window").height - 40,
  },
  city: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  detailsContainer: {
    width: "100%",
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default WeatherCard;
