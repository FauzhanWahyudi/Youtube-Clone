import { Text, TouchableHighlight, View } from "react-native";

export default function Login({ navigation }) {
  return (
    <View>
      <Text>Login</Text>;
      <TouchableHighlight onPress={() => navigation.navigate("Home")}>
        <View className="bg-slate-600 p-2">
          <Text>Home</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
