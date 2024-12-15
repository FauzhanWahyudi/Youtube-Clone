import { useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { AddFollowing } from "../mutations/AddFollowing";
import { SEARCH_USER } from "../queries/users";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import ProfileContext from "../contexts/profile";

// SearchPage Component
export default function Search({ navigation }) {
  const { setProfile, refetch } = useContext(ProfileContext);
  const [search, setSearch] = useState("");
  const { data, loading, error } = useQuery(SEARCH_USER, {
    variables: { search },
  });
  const [addFollowing] = useMutation(AddFollowing);

  const handleFollow = (userId) => {
    addFollowing({ variables: { body: { followingId: userId } } });
    refetch().then((data) => setProfile(data?.data?.user));
    navigation.navigate("Subscriptions");
  };

  return (
    <ScrollView className="flex-1 p-safe bg-gray-100">
      <TextInput
        placeholder="Search users"
        value={search}
        onChangeText={setSearch}
        className="border p-2 rounded mb-4"
      />
      {loading && (
        <ActivityIndicator size="large" className="flex-1 justify-center" />
      )}
      {error && <Text>Error: {error.message}</Text>}
      {data?.searchUser.length === 0 ? (
        <Text className="text-gray-500">No users found.</Text>
      ) : (
        data?.searchUser.map((user) => (
          <View
            key={user._id}
            className="mt-2 border-b border-gray-300 pb-2 flex-row justify-between w-full"
          >
            <TouchableOpacity
              className="ml-3"
              onPress={() =>
                navigation.navigate("OtherProfile", { _id: user._id })
              }
            >
              <Text className="font-bold">{user.username}</Text>
              <Text>{user.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleFollow(user._id)}
              className="mt-2 bg-blue-500 p-2 rounded mr-3"
            >
              <Text className="text-white">Follow</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}
