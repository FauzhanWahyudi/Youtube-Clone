import { Text, View } from "react-native";
import { Card } from "react-native-paper";

export const PostCard = ({ item }) => (
  <Card style={{ borderRadius: 0 }}>
    <Card.Cover
      source={{
        uri: item.imgUrl,
      }}
      style={{ borderRadius: 0 }}
    />
    <Card.Content>
      <View className="items-center">
        <Text className="text-black line-clamp-1">{item.content}</Text>
        <Text className="text-black">{item.author.username}</Text>
      </View>
    </Card.Content>
  </Card>
);
