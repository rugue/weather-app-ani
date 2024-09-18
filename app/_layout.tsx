import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "../app/context/ThemeContext";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Weather App" }} />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
