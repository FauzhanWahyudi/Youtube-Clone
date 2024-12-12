import { Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/posts";

export default function PostsCard() {
  const response = useQuery(GET_POSTS);
  if (response.loading) return <Text className="text-white">Loading...</Text>;
  console.log(response.data);
  return (
    <>
      <View>{response.data}</View>
    </>
  );
}
