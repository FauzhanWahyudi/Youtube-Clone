import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigations/Stack";

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
