// CreatePost.js
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { TouchableOpacity, Image, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { TextInput, Text } from "react-native-paper";
import DescModal from "../components/DescModal";
import TagModal from "../components/TagModal";
import ThumbnailModal from "../components/ThumbnailModal";
import { useMutation } from "@apollo/client";
import { AddPost } from "../mutations/AddPost";
import { GET_POSTS } from "../queries/posts";

export default function CreatePost({ navigation }) {
  const [visible, toggleModal] = useState(false);
  const [visibleTagModal, toggleTagModal] = useState(false);
  const [visibleThumbnailModal, toggleThumbnailModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [addPost, { loading, error }] = useMutation(AddPost);

  const uploadPost = async () => {
    await addPost({
      variables: {
        body: {
          content: title ? title + " \n " + description : "",
          imgUrl: thumbnail,
          tags: tags.split(","),
        },
      },
      refetchQueries: [{ query: GET_POSTS, awaitRefetchQueries: true }],
    })
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Upload Video",
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Upload Video Failed",
          text2: error.message,
        });
      })
      .finally(() => {
        navigation.navigate("Home");
      });
  };
  const tagSplit = tags.split(",");
  return (
    <View className="flex-1 p-safe">
      {/* Header */}
      <View className="bg-slate-200 p-4 flex-row justify-between items-center">
        <Text className="text-white text-lg">Create a New Post</Text>
        <TouchableOpacity
          className="bg-red-600 px-4 py-2 rounded-full"
          onPress={uploadPost}
        >
          <Text style={{ color: "white" }}>Publish</Text>
        </TouchableOpacity>
      </View>

      {/* Thumbnail Section */}
      <TouchableOpacity
        onPress={toggleThumbnailModal}
        className="bg-gray-300 h-56 justify-center items-center"
      >
        {thumbnail ? (
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full object-cover"
          />
        ) : (
          <Text className="text-gray-100">Add Thumbnail</Text>
        )}
      </TouchableOpacity>

      {/* Title Input */}
      <View className="p-4">
        <Text className="text-gray-100 mb-1">Title</Text>
        <TextInput
          label="Title"
          placeholder="Enter a title"
          value={title}
          onChangeText={setTitle}
          className="bg-gray-200 text-white"
        />
      </View>

      {/* Description */}
      <TouchableOpacity
        onPress={toggleModal}
        className="p-4 border-b border-gray-700"
      >
        {description ? (
          <>
            <Text className="text-white">Description</Text>
            <Text className="text-white" variant="labelSmall">
              {description}
            </Text>
          </>
        ) : (
          <Text className="text-white">Add Description</Text>
        )}
      </TouchableOpacity>

      {/* Tags */}
      <TouchableOpacity
        onPress={toggleTagModal}
        className="p-4 border-b border-gray-700"
      >
        {tags ? (
          <>
            <Text className="text-white">Tags</Text>
            <View className="flex-row flex-wrap mb-3">
              {tagSplit.map((tag, index) => (
                <Text key={index} className="text-blue-400 text-sm mr-2">
                  #{tag}
                </Text>
              ))}
            </View>
          </>
        ) : (
          <Text className="text-white">Add Tags</Text>
        )}
      </TouchableOpacity>

      <DescModal
        visible={visible}
        toggleModal={toggleModal}
        description={description}
        setDescription={setDescription}
      />
      <TagModal
        visibleTagModal={visibleTagModal}
        toggleTagModal={toggleTagModal}
        tags={tags}
        setTags={setTags}
      />
      <ThumbnailModal
        visibleThumbnailModal={visibleThumbnailModal}
        toggleThumbnailModal={toggleThumbnailModal}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
      />
    </View>
  );
}
