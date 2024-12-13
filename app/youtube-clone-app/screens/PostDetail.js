import * as SecureStore from "expo-secure-store";
import { Text, TouchableHighlight, View } from "react-native";
import { useEffect } from "react";

export default function PostDetail({ navigation }) {
  // const navigation = useNavigation();
  //can be used when component is 2 level lower from Navigation (Stack or etc) like card inside Home
  useEffect(() => {
    const access_token = SecureStore.getItem("access_token");
    console.log(access_token);
    if (!access_token) navigation.navigate("Login");
  }, []);
  return (
    <View className="p-safe">
      <Text className="text-white">POST PostDetail</Text>
    </View>
  );
}
