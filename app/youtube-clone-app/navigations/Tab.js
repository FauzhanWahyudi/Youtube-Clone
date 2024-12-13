import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Ionicons from "react-native-vector-icons/Ionicons";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import CreatePost from "../screens/CreatePost";
const Tab = createBottomTabNavigator();
export default function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = null;
          if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Shorts") {
            iconName = focused ? "flash" : "flash-outline";
          } else if (route.name === "CreatePost") {
            iconName = focused ? "add" : "add-outline";
          } else if (route.name === "Subscriptions") {
            iconName = focused ? "albums" : "albums-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "Youtube" }} />
      <Tab.Screen
        name="Shorts"
        component={Home}
        options={{ title: "Shorts" }}
      />
      <Tab.Screen name="CreatePost" component={CreatePost} />
      <Tab.Screen name="Subscriptions" component={Profile} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
