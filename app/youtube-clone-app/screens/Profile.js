import { TouchableHighlight, View, Text } from "react-native";

export default function Profile({ navigation }) {
  // const navigation = useNavigation();
  //can be used when component is 2 level lower from Navigation (Stack or etc) like card inside Home
  return (
    <View className="flex-1 justify-center items-center p-2">
      
      <Text className="text-white">Profile</Text>
      <Text>Youtube</Text>
      <TouchableHighlight onPress={() => navigation.navigate("Home")}>
        <View className="bg-slate-600 p-2">
          <Text>Home</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
