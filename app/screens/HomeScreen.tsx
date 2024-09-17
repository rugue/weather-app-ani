import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchWeatherData, setCity } from "../store/weatherSlice";
import { useTheme } from "../../app/context/ThemeContext";
import WeatherCard from "../../components/WeatherCard";
import { useOrientation } from "../../hooks/useOrientation";

const { width, height } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const orientation = useOrientation();
  const {
    data: weatherData,
    loading,
    error,
    city,
  } = useAppSelector((state) => state.weather);
  const [inputCity, setInputCity] = useState(city);

  const fetchWeather = useCallback(
    (cityName: string) => {
      if (cityName.trim()) {
        dispatch(setCity(cityName.trim()));
        dispatch(fetchWeatherData(cityName.trim()));
      } else {
        Alert.alert("Invalid Input", "Please enter a valid city name.");
      }
    },
    [dispatch]
  );

  const handleSubmit = () => {
    fetchWeather(inputCity);
  };

  const containerStyle = [
    styles.container,
    { backgroundColor: theme.backgroundColor },
    orientation === "LANDSCAPE" && styles.landscapeContainer,
  ];

  const inputContainerStyle = [
    styles.inputContainer,
    orientation === "LANDSCAPE" && styles.inputContainerLandscape,
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={containerStyle}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={inputContainerStyle}>
          <TextInput
            style={[styles.input, { backgroundColor: theme.backgroundColor }]}
            value={inputCity}
            onChangeText={setInputCity}
            placeholder="Enter city name"
            placeholderTextColor={theme.textColor}
          />
          <Button title="Search" onPress={handleSubmit} />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={theme.textColor} />
        ) : error ? (
          <Text style={[styles.error, { color: theme.errorColor }]}>
            Error: {error}
          </Text>
        ) : weatherData ? (
          <WeatherCard weatherData={weatherData} />
        ) : (
          <Text style={{ color: theme.textColor }}>
            Enter a city name and press 'Search' to get weather data.
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  landscapeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
  },
  inputContainerLandscape: {
    width: "45%",
    marginRight: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  error: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default HomeScreen;
