import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from "../screens/Profile";
import CreatePost from "../screens/CreatePost";
import { Touchable, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import Subscriptions from "../screens/Subscriptions";
const Tab = createBottomTabNavigator();
export default function MainTab({ navigation }) {
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
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="logo-youtube"
                size={30}
                color="red"
                style={{ marginRight: 8 }}
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>YouTube</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Search")}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="search" size={25} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Shorts"
        component={Home}
        options={{
          title: "Shorts",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="logo-youtube"
                size={30}
                color="red"
                style={{ marginRight: 8 }}
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Shorts</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Search")}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="search" size={25} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Subscriptions"
        component={Subscriptions}
        options={{
          title: "Subscriptions",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="logo-youtube"
                size={30}
                color="red"
                style={{ marginRight: 8 }}
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Subscriptions
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="logo-youtube"
                size={30}
                color="red"
                style={{ marginRight: 8 }}
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
