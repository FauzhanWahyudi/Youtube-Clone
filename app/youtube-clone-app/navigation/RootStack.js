import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import MainTab from "./Tab";
import PostDetail from "../screens/PostDetail";
import { use, useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/auth";
import Search from "../screens/Search";
import ProfileContext from "../contexts/profile";
import OtherProfile from "../screens/OtherProfile";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../queries/users";
import { ActivityIndicator, Text } from "react-native-paper";
import { View } from "react-native";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();
export default function RootStack() {
  const { isSignedIn } = useContext(AuthContext);
  console.log(isSignedIn, "isSignedIn");

  const { data, loading, error, refetch } = useQuery(GET_PROFILE);
  const [profile, setProfile] = useState({
    user: {},
    following: [],
    followers: [],
  });
  // console.log(data?.user?.user);
  useEffect(() => {
    if (data) setProfile(data.user);
  }, []);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-center">...Loading</Text>
      </View>
    );

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, refetch, loading, error }}
    >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isSignedIn ? "MainTab" : "Login"}
      >
        {isSignedIn ? (
          <>
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="PostDetail" component={PostDetail} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="OtherProfile" component={OtherProfile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </ProfileContext.Provider>
  );
}
