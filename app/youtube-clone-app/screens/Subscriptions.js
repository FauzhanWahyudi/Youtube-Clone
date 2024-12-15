import * as SecureStore from "expo-secure-store";
import { useContext, useEffect } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import AuthContext from "../contexts/auth";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../queries/users";
import ProfileContext from "../contexts/profile";

// ProfilePage Component
export default function Subscriptions({ route }) {
  const { profile, setProfile, refetch } = useContext(ProfileContext);
  const following = profile.following;

  // const { data, loading, error, refetch } = useQuery(GET_PROFILE);
  useEffect(() => {
    refetch().then((data) => setProfile(data.data.user));
  }, [profile.following]);
  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      {following ? (
        <View className="mt-4 bg-white rounded shadow p-4">
          <Text className="text-lg font-bold">
            Subscribed To ({following.length}):
          </Text>
          {following.length === 0 ? (
            <Text className="text-gray-500">Not subscribed to anyone yet.</Text>
          ) : (
            following.map((follow) => (
              <View key={follow._id} className="mt-2">
                <Text className="font-bold">{follow.user.username}</Text>
                <Text>{follow.user.email}</Text>
              </View>
            ))
          )}
        </View>
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}
    </ScrollView>
  );
}
