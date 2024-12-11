import { TouchableHighlight, View, Text } from "react-native";

export default function Home({ navigation }) {
  // const navigation = useNavigation(); ini bisa dipake
  // pas butuh yang udh dalem components nya
  return (
    <View className="">
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Youtube Haward</Text>
      <TouchableHighlight onPress={() => navigation.navigate("Login")}>
        <View className="bg-slate-600 p-2">
          <Text>Login</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
