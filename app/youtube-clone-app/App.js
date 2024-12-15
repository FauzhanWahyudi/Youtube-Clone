import "./global.css";
import * as SecureStore from "expo-secure-store";
import { ApolloProvider } from "@apollo/client";
import { PaperProvider } from "react-native-paper";
import RootStack from "./navigation/RootStack";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";
import client from "./config/apollo-client";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./contexts/auth";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((token) => {
      if (token) setIsSignedIn(true);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <ApolloProvider client={client}>
        <PaperProvider theme={CombinedDarkTheme}>
          <NavigationContainer theme={CombinedDarkTheme}>
            <RootStack />
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
