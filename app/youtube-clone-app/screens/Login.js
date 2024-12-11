import { Text, TouchableHighlight, View } from "react-native";

export default function Login({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center p-2">
      <Text>Login</Text>
      <TouchableHighlight onPress={() => navigation.navigate("Home")}>
        <View className="bg-slate-600 p-2">
          <Text>Home</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
