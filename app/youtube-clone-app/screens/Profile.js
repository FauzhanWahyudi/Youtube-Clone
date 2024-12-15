import * as SecureStore from "expo-secure-store";
import { useContext, useEffect } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import AuthContext from "../contexts/auth";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../queries/users";
import ProfileContext from "../contexts/profile";

// ProfilePage Component
export default function Profile({ route }) {
  const { profile } = useContext(ProfileContext);
  const { user, followers } = profile;

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
        </>
      )}
    </ScrollView>
  );
}
