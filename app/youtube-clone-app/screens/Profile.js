import { Image, View } from "react-native";
import { Text } from "react-native-paper";

export default function Profile({ navigation }) {
  return (
    <View className="justify-center items-center" style={{ flex: 1 }}>
      <View className="justify-center items-center" style={{ flex: 1 }}>
        <View className="flex flex-row  gap-4 justify-center items-center">
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/023/041/976/small_2x/glass-globe-ball-with-tree-growing-and-green-nature-blur-background-eco-earth-day-concept-generat-ai-free-photo.jpg",
            }}
            style={{ width: "70", height: "70" }}
          />
          <View>
            <Text variant="titleLarge">Username</Text>
            <Text variant="bodyMedium">Email</Text>
            <Text variant="bodySmall">6 Videos</Text>
          </View>
        </View>
      </View>
      <View className="justify-center items-center" style={{ flex: 1 }}>
        <Text className="uppercase text-3xl"> Follower / Following</Text>
      </View>
      <View className="justify-center items-center" style={{ flex: 2 }}>
        <Text className="uppercase text-3xl"> LIST OF Videos</Text>
      </View>
    </View>
  );
}
