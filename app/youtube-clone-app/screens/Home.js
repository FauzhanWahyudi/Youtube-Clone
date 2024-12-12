import * as SecureStore from "expo-secure-store";
import { Text, TouchableHighlight, View } from "react-native";
import PostsCard from "../components/posts";
import { useEffect } from "react";

export default function Home({ navigation }) {
  // const navigation = useNavigation();
  //can be used when component is 2 level lower from Navigation (Stack or etc) like card inside Home
  useEffect(() => {
    const access_token = SecureStore.getItem("access_token");
    // console.log(access_token);
    if (!access_token) navigation.navigate("Login");
  }, []);
  return (
    <View className="flex-1 justify-center items-center p-2">
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl text-white">HALOWWW</Text>
      </View>
      <View className="flex-1 justify-center items-center">
        <PostsCard />
      </View>
      <View className="flex-1 justify-center items-center">
        {" "}
        <TouchableHighlight onPress={() => navigation.navigate("Login")}>
          <Text className="text-white">Login</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
