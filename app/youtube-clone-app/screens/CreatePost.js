import * as SecureStore from "expo-secure-store";
import { Text, TouchableHighlight, View } from "react-native";
import { useEffect } from "react";
import Posts from "../components/PostCard";

export default function CreatePost({ navigation }) {
  // const navigation = useNavigation();
  //can be used when component is 2 level lower from Navigation (Stack or etc) like card inside Home
  useEffect(() => {
    const access_token = SecureStore.getItem("access_token");
    console.log(access_token);
    if (!access_token) navigation.navigate("Login");
  }, []);
  return (
    <View className="flex-1">
      <Text className="text-white">create post</Text>
    </View>
  );
}
