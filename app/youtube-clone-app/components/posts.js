import { FlatList, Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/posts";
import { Card } from "react-native-paper";

const Item = ({ title }) => (
  <Card className="w-[90vw] mb-2">
    <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
    <Card.Content>
      <View className="flex items-center">
        <Text className="text-white">{title.content}</Text>
        <Text className="text-white">{title.author[0].username}</Text>
      </View>
    </Card.Content>
  </Card>
);
export default function PostsCard() {
  const { loading, data } = useQuery(GET_POSTS);
  if (loading) return <Text className="text-white">Loading...</Text>;
  console.log(data.posts[0]._id);
  return (
    <>
      <View className="flex-1 w-full">
        <FlatList
          data={data.posts}
          renderItem={({ item }) => {
            console.log(item);
            return <Item title={item} />;
          }}
          keyExtractor={(item) => item._id}
        />
      </View>
    </>
  );
}
