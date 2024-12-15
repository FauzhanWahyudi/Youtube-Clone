import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/posts";
import { PostCard } from "../components/PostCard";

function TouchableCard({ title, navigation }) {
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("PostDetail")}>
        <PostCard title={title} />
      </TouchableOpacity>
    </>
  );
}

export default function Home({ navigation }) {
  const { loading, data, error } = useQuery(GET_POSTS);

  //because if return before useEffect react will throw error that hooks quantity is not same in same function
  if (loading) return <Text className="text-white">Loading...</Text>;
  if (error) return <Text className="text-white">{error.message}</Text>;

  return (
    <View>
      <FlatList
        contentContainerClassName="gap-3"
        data={data.posts}
        renderItem={({ item }) => {
          // console.log(item);
          return <TouchableCard title={item} navigation={navigation} />;
        }}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
