import { Text, View } from "react-native";
import { Card } from "react-native-paper";

export const PostCard = ({ title }) => (
  <Card style={{ borderRadius: 0 }}>
    <Card.Cover
      source={{
        uri: "https://images.unsplash.com/photo-1732445027430-fbe0961cb100?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{ borderRadius: 0 }}
    />
    <Card.Content>
      <View className="items-center">
        <Text className="text-white">{title.content}</Text>
        <Text className="text-white">{title.author[0].username}</Text>
      </View>
    </Card.Content>
  </Card>
);
