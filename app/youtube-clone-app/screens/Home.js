import { TouchableHighlight, View, Text } from "react-native";

export default function Home({ navigation }) {
  // const navigation = useNavigation();
  //can be used when component is 2 level lower from Navigation (Stack or etc) like card inside Home
  return (
    <View className="flex-1 justify-center items-center p-2">
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Youtube</Text>
      <TouchableHighlight onPress={() => navigation.navigate("Login")}>
        <View className="bg-slate-600 p-2">
          <Text>Login</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
