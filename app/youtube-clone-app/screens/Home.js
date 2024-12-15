// Home.js
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/posts";
import { PostCard } from "../components/PostCard";

function TouchableCard({ item, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PostDetail", { postId: item._id })}
      className="mb-4"
    >
      <PostCard item={item} />
    </TouchableOpacity>
  );
}

export default function Home({ navigation }) {
  const { loading, data, error, refetch } = useQuery(GET_POSTS);

  if (loading)
    return <Text className="text-center text-white">Loading...</Text>;
  if (error)
    return (
      <Text className="text-center text-white">Error: {error.message}</Text>
    );

  return (
    <View className="flex-1">
      <FlatList
        contentContainerClassName="p-4"
        data={data.posts}
        renderItem={({ item }) => (
          <TouchableCard item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
