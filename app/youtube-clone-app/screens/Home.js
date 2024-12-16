// Home.js
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/posts";
import { PostCard } from "../components/PostCard";
import ProfileContext from "../contexts/profile";
import { useContext, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";

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
  const profileContext = useContext(ProfileContext);

  useEffect(() => {
    profileContext.refetch().then((data) => setProfile(data?.data?.user));
  }, [profileContext.profile, profileContext.refetch]);

  if (loading || profileContext.loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-center">...Loading</Text>
      </View>
    );
  }

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
