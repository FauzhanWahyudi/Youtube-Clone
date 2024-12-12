import * as SecureStore from "expo-secure-store";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Profile({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex-1 justify-center items-center">
        <View className="flex flex-row  gap-4 justify-center items-center">
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/023/041/976/small_2x/glass-globe-ball-with-tree-growing-and-green-nature-blur-background-eco-earth-day-concept-generat-ai-free-photo.jpg",
            }}
            style={{ width: "70", height: "70" }}
          />
          <View>
            <Text className="text-white">Username</Text>
            <Text className="text-white"> Email</Text>
            <Text className="text-white">6 Videos</Text>
          </View>
        </View>
      </View>
      <View className="flex-1 justify-center items-center">
        <Text className="uppercase text-3xl text-white">
          Follower / Following
        </Text>
      </View>
      <View className="flex-1 justify-center items-center" style={{ flex: 2 }}>
        <Text className="uppercase text-3xl text-white"> LIST OF Videos</Text>
        <TouchableOpacity
          onPress={() => SecureStore.deleteItemAsync("access_token")}
        >
          <Text className="text-white text-4xl">Log OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
