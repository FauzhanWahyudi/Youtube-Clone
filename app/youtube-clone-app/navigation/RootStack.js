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

const Stack = createNativeStackNavigator();
export default function RootStack() {
  const { isSignedIn } = useContext(AuthContext);
  console.log(isSignedIn, "isSignedIn");

  const { data, loading, error, refetch } = useQuery(GET_PROFILE);
  const [profile, setProfile] = useState({});
  console.log(data?.user?.user);
  useEffect(() => {
    setProfile(data?.user);
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, refetch }}>
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
    </ProfileContext.Provider>
  );
}
