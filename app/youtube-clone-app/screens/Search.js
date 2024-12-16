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
import { View, StyleSheet } from "react-native";
import ProfileContext from "../contexts/profile";
import Toast from "react-native-toast-message";

export default function Search({ navigation }) {
  const { setProfile, refetch } = useContext(ProfileContext);
  const [search, setSearch] = useState("");
  const { data, loading, error } = useQuery(SEARCH_USER, {
    variables: { search },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Search Error",
        text2: err.message,
      });
    },
  });
  const [addFollowing] = useMutation(AddFollowing, {
    onCompleted: (data) => {
      // console.log(data);
      Toast.show({
        type: "success",
        text1: "Followed",
        text2: "You have successfully followed the user.",
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Follow Error",
        text2: err.message,
      });
    },
  });

  const handleFollow = (userId) => {
    addFollowing({ variables: { body: { followingId: userId } } });
    refetch().then((data) => setProfile(data.data.user));
    navigation.navigate("Subscriptions");
  };

  return (
    <ScrollView style={styles.container} contentContainerClassName="p-safe">
      <Text style={styles.title}>Find Users</Text>
      <TextInput
        placeholder="Search for users..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
          <Text className="text-center">...Loading</Text>
        </View>
      )}
      {error && (
        <Text style={styles.errorText}>An error occurred: {error.message}</Text>
      )}
      {data?.searchUser?.length === 0 ? (
        <Text style={styles.noResultText}>No users found.</Text>
      ) : (
        data?.searchUser?.map((user) => (
          <View key={user._id} style={styles.userCard}>
            <TouchableOpacity
              style={styles.userInfo}
              onPress={() =>
                navigation.navigate("OtherProfile", { _id: user._id })
              }
            >
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleFollow(user._id)}
              style={styles.followButton}
            >
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: "#ff0000",
    textAlign: "center",
    marginVertical: 8,
  },
  noResultText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  followButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  followText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
