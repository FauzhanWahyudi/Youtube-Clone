import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import MainTab from "./Tab";
import CreatePost from "../screens/CreatePost";
import PostDetail from "../screens/PostDetail";
import Search from "../screens/Search";
import { useContext } from "react";
import AuthContext from "../contexts/auth";

const Stack = createNativeStackNavigator();
export default function RootStack() {
  const { isSignedIn } = useContext(AuthContext);
  console.log(isSignedIn);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <>
          <Stack.Screen name="MainTab" component={MainTab} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}
