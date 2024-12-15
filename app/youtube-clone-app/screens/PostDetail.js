// PostDetail.js
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POST } from "../queries/posts";
import { Image } from "react-native";
import timeSince from "../helpers/formatAgo";
import { AddLike } from "../mutations/AddLike";
import { AddComment } from "../mutations/AddComments";
import { use, useContext, useEffect, useState } from "react";
import ProfileContext from "../contexts/profile";
import AuthContext from "../contexts/auth";

// PostDetail Component
export default function PostDetail({ navigation, route }) {
  const { isSignedIn } = useContext(AuthContext);
  const { postId } = route.params;
  const { data, loading, error, refetch } = useQuery(GET_POST, {
    variables: { id: postId },
  });
  const [addLike] = useMutation(AddLike);
  const [isLiked, setIsliked] = useState(false);
  useEffect(() => {
    setIsliked(false);
  }, [isSignedIn]);
  const [addComment] = useMutation(AddComment);
  const [newComment, setNewComment] = useState("");
  const { profile } = useContext(ProfileContext);

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
    });
    return <Text>Error: {error.message}</Text>;
  }

  const { post } = data || {};
  const isLikedCheck = () => {
    if (!post?.likes) return false;
    return post.likes.some((like) => {
      return like.username === profile.user.username;
    });
  };

  const handleAddLike = async () => {
    try {
      await addLike({
        variables: { body: { postId } },
        refetchQueries: [
          {
            query: GET_POST,
            variables: { body: { postId } },
            awaitRefetchQueries: true,
          },
        ],
      });
      await refetch(); // Leverage the refetch function from useQuery
      Toast.show({
        type: "success",
        text1: "Post Liked",
        text2: "Your like was successfully added.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  const handleAddComment = async () => {
    try {
      await addComment({
        variables: { body: { postId, content: newComment } },
        refetchQueries: [
          {
            query: GET_POST,
            variables: { body: { postId } },
            awaitRefetchQueries: true,
          },
        ],
      });
      await refetch(); // Leverage the refetch function from useQuery
      setNewComment("");
      Toast.show({
        type: "success",
        text1: "Comment Added",
        text2: "Your comment was successfully added.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  return (
    <View className="flex-1 p-safe">
      <Image
        source={{ uri: post.imgUrl }}
        className="flex-grow-[5] object-cover"
      />
      <View className="p-4 justify-end">
        <View className="">
          <Text className="text-xl font-bold">{post.content}</Text>
          <Text className="text-sm text-gray-500">
            {timeSince(post.createdAt)}
          </Text>
          <Text className="mt-2 text-sm">By {post.author.username}</Text>
          <Text className="mt-2">Tags: {post.tags.join(", ")}</Text>
          {!isLikedCheck() && !isLiked ? (
            <TouchableOpacity
              onPress={() => {
                handleAddLike();
                setIsliked(true);
              }}
              className="mt-4 bg-blue-500 p-2 rounded"
            >
              <Text className="text-white">
                Like ({post.likes?.length || 0})
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="mt-4 bg-red-500 p-2 rounded">
              <Text className="text-white">
                dislike ({post.likes?.length || 0})
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="h-56">
          <FlatList
            data={post.comments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="mt-2 border-b border-gray-300 pb-2">
                <Text className="font-bold">{item.username}</Text>
                <Text>{item.content}</Text>
                <Text className="text-xs text-gray-500">
                  {timeSince(item.createdAt)}
                </Text>
              </View>
            )}
          />
        </View>
        <View className="mt-4">
          <TextInput
            placeholder="Add a comment"
            value={newComment}
            onChangeText={setNewComment}
            className="border p-2 rounded"
          />
          <TouchableOpacity
            onPress={handleAddComment}
            className="mt-2 bg-green-500 p-2 rounded"
          >
            <Text className="text-white">
              {addComment.loading ? "...adding your comment" : "Post Comment"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
