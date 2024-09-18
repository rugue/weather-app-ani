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
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchWeatherData, setCity } from "../store/weatherSlice";
import { useTheme } from "../context/ThemeContext";
import WeatherCard from "../../components/WeatherCard";
import { useOrientation } from "../../hooks/useOrientation";

const { width, height } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
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

  const isLandscape = orientation === "LANDSCAPE";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          isLandscape && styles.landscapeScrollViewContent,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.contentContainer,
            isLandscape && styles.landscapeContentContainer,
          ]}
        >
          <View
            style={[
              styles.inputContainer,
              isLandscape && styles.landscapeInputContainer,
            ]}
          >
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.backgroundColor,
                  color: theme.textColor,
                },
              ]}
              value={inputCity}
              onChangeText={setInputCity}
              placeholder="Enter city name"
              placeholderTextColor={theme.textColor}
            />
            <Button
              title="Search"
              onPress={handleSubmit}
              color={theme.buttonColor}
            />
          </View>

          <View
            style={[
              styles.weatherContainer,
              isLandscape && styles.landscapeWeatherContainer,
            ]}
          >
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
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  landscapeScrollViewContent: {
    flexGrow: 1,
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  landscapeContentContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
  },
  landscapeInputContainer: {
    width: "45%",
  },
  landscapeWeatherContainer: {
    width: "55%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  weatherContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  error: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomeScreen;
