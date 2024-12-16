import * as SecureStore from "expo-secure-store";
import { useContext, useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AuthContext from "../contexts/auth";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../queries/users";
import ProfileContext from "../contexts/profile";

// ProfilePage Component
export default function OtherProfile({ route }) {
  const { data, loading, error, refetch } = useQuery(GET_PROFILE, {
    variables: { id: route.params._id },
  });
  // console.log(route.params._id);
  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-center">...Loading</Text>
      </View>
    );

  if (error) return <Text>Error: {error.message}</Text>;

  console.log(data.user);
  const { user, followers, following } = data?.user;
  console.log(user);
  return (
    <View className="p-safe flex-1">
      <ScrollView contentContainerClassName="flex-1 bg-gray-100 pt-4">
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
            <View className="mt-4 bg-white rounded shadow p-4">
              <Text className="text-lg font-bold">
                Subscribed To ({following.length}):
              </Text>
              {following.length === 0 ? (
                <Text className="text-gray-500">
                  Not subscribed to anyone yet.
                </Text>
              ) : (
                following.map((follow) => (
                  <View key={follow._id} className="mt-2">
                    <Text className="font-bold">{follow.user.username}</Text>
                    <Text>{follow.user.email}</Text>
                  </View>
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
