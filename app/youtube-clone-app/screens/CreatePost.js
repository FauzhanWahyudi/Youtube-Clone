import * as SecureStore from "expo-secure-store";
import {
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import DescModal from "../components/DescModal";
import TagModal from "../components/TagModal";
import ThumbnailModal from "../components/ThumbnailModal";
import { useMutation } from "@apollo/client";
import { AddPost } from "../mutations/AddPost";
import { GET_POST } from "../queries/posts";

export default function CreatePost({ navigation }) {
  //check user
  useEffect(() => {
    const access_token = SecureStore.getItem("access_token");
    console.log("access_token :", access_token);
    if (!access_token) navigation.navigate("Login");
  }, []);

  //modal toggle
  const [visible, toggleModal] = useState(false);
  const [visibleTagModal, toggleTagModal] = useState(false);
  const [visibleThumbnailModal, toggleThumbnailModal] = useState(false);

  //input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [addPost, { data, loading, error }] = useMutation(AddPost);

  const uploadPost = async () => {
    console.log(title, description, tags, thumbnail);
    await addPost({
      variables: {
        body: {
          content: title + " \n " + description,
          imgUrl: thumbnail,
          tags: tags.split(","),
        },
      },
      refetchQueries: [GET_POST],
    });
    navigation.navigate("Home");
  };

  if (loading) return <Text>...loading</Text>;
  if (error) return <Text>...error {error}</Text>;
  console.log("data", data);

  return (
    <View className="flex-1">
      <View className="flex-grow-[1] flex-row justify-between w-full bg-emerald-600">
        <Text>Header</Text>
        <TouchableOpacity className="bg-purple-50" onPress={uploadPost}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-grow-[3] bg-red-600">
        <Text>Video Preview</Text>
        <Text>{thumbnail}</Text>
      </View>
      <View className="flex-grow-[1] bg-yellow-600">
        <Text>Title</Text>
        <TextInput
          label="Title"
          placeholder="create a title (type @ to mention a channel)"
          value={title}
          onChangeText={setTitle}
        ></TextInput>
      </View>
      <View className="flex-grow-[3] bg-purple-600">
        <TouchableOpacity
          className="flex-grow-[1] bg-purple-50"
          onPress={toggleModal}
        >
          <Text>Description</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-grow-[1] bg-purple-100"
          onPress={toggleTagModal}
        >
          <Text>Tags</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-grow-[1] bg-purple-200"
          onPress={toggleThumbnailModal}
        >
          <Text>Thumbnails</Text>
        </TouchableOpacity>
        <View className="flex-grow-[1] bg-purple-250">
          <Text>Visibility</Text>
        </View>
        <View className="flex-grow-[1] bg-purple-350">
          <Text>Location</Text>
        </View>
        <View className="flex-grow-[1] bg-purple-500">
          <Text>Add to playlists</Text>
        </View>
        <View className="flex-grow-[1] bg-purple-600">
          <Text>Add paid promotion label</Text>
        </View>
      </View>
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
