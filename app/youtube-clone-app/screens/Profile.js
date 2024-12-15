import * as SecureStore from "expo-secure-store";
import { use, useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import AuthContext from "../contexts/auth";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../queries/users";
import ProfileContext from "../contexts/profile";

// ProfilePage Component
export default function Profile({ route }) {
  const { profile, setProfile, refetch } = useContext(ProfileContext);
  const { setIsSignedIn } = useContext(AuthContext);
  const { user, followers } = profile;
  const [isLoggingOut, setIsLoggingOut] = useState(false); // State to track logout progress
  useEffect(() => {
    refetch().then((data) => setProfile(data.data.user));
  }, [profile, refetch]);
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await SecureStore.deleteItemAsync("access_token"); // Clear auth token
      setIsSignedIn(false); // Call logout function from AuthContext
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      {user && (
        <>
          <View className="bg-white rounded shadow p-4">
            <Text className="text-2xl font-bold">
              {user.name} (@{user.username})
            </Text>
            <Text className="text-gray-600">{user.email}</Text>
          </View>
          <View className="mt-4 bg-white rounded shadow p-4">
            <Text className="text-lg font-bold">
              Subscribers ({followers ? followers.length : "0"}):
            </Text>
            {followers.length === 0 ? (
              <Text className="text-gray-500">No subscribers yet.</Text>
            ) : (
              followers.map((follower) => (
                <View key={follower._id} className="mt-2">
                  <Text className="font-bold">{follower.user.username}</Text>
                  <Text>{follower.user.email}</Text>
                </View>
              ))
            )}
          </View>
          <TouchableOpacity
            style={{ marginTop: 10, padding: 10, backgroundColor: "red" }}
            onPress={handleLogout}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {isLoggingOut ? "Logging Out..." : "Logout"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
