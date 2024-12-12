import { Text, TouchableHighlight, View } from "react-native";
import PostsCard from "../components/posts";

export default function Home({ navigation }) {
  // const navigation = useNavigation();
  //can be used when component is 2 level lower from Navigation (Stack or etc) like card inside Home
  return (
    <View className="flex-1 justify-center items-center p-2">
      <Text className="text-3xl text-white">HALOWWW</Text>
      <PostsCard />
      <TouchableHighlight onPress={() => navigation.navigate("Login")}>
        <Text>Login</Text>
      </TouchableHighlight>
    </View>
  );
}
