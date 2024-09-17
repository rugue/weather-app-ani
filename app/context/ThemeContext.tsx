import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

interface Theme {
  backgroundColor: string;
  textColor: string;
  cardBackground: string;
  buttonColor: string;
  errorColor: string;
}

const lightTheme: Theme = {
  backgroundColor: "#F0F0F0",
  textColor: "#000000",
  cardBackground: "#FFFFFF",
  buttonColor: "#007AFF",
  errorColor: "#FF3B30",
};

const darkTheme: Theme = {
  backgroundColor: "#121212",
  textColor: "#FFFFFF",
  cardBackground: "#1E1E1E",
  buttonColor: "#0A84FF",
  errorColor: "#FF453A",
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(
    colorScheme === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
