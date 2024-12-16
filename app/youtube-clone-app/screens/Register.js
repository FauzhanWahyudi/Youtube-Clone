import { useMutation } from "@apollo/client";
import { useState } from "react";
import { View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Text,
  TextInput,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AddUser } from "../mutations/AddUser";
import Toast from "react-native-toast-message";

export default function Register({ navigation }) {
  const [addUserMutation, { loading, error, data }] = useMutation(AddUser);
  //get insets data for safe area padding
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const addUserSubmit = async () => {
    try {
      console.log(name, username, email, password);
      if (password !== rePassword) throw new Error("Password not matched");
      await addUserMutation({
        variables: { body: { name, username, email, password } },
      });
      Toast.show({
        type: "success",
        text1: "Register Successful",
      });
      navigation.navigate("Login");
    } catch (error) {
      console.log("🚀 ~ addUserSubmit ~ error:", error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message,
      });
    }
  };
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-center">...Loading</Text>
      </View>
    );
  }
  if (error) {
    Toast.show({
      type: "error",
      text1: "Register Failed",
      text2: error.message,
    });
  }
  return (
    //flex-1 is needed because the view need to cover entire section available
    <View className="flex-1 justify-center items-center p-safe">
      <Card className="w-5/6 justify-center" style={{ padding: "20" }}>
        <Card.Cover
          source={{
            uri: "https://lh3.googleusercontent.com/3_OFn2skqHXk-UQ-9RUdNrDl_HQJrMCxks5teQcUrF_bOSeDG1hD8j83FeD31W8hASZCvubzsGfumuJq8kvvSAq03wY87RZ7Otx_DF4",
          }}
          style={{
            backgroundColor: "none",
            width: 90,
            height: 80,
            objectFit: "cover",
            marginHorizontal: "auto",
          }}
        />
        <Card.Content style={{ marginTop: "10" }}>
          <Text variant="headlineLarge" style={{ textAlign: "center" }}>
            Register
          </Text>
          <Text
            variant="bodyMedium"
            style={{ textAlign: "center", marginTop: "10", fontWeight: "bold" }}
          >
            or SSO
          </Text>
        </Card.Content>
        <Card.Actions style={{ marginTop: "0" }}>
          <Button mode="text" onPress={() => console.log("google")}>
            <Avatar.Icon
              icon="google"
              size={50}
              color="#000"
              style={{ backgroundColor: "none" }}
            />
          </Button>
          <Button mode="text" onPress={() => console.log("github")}>
            <Avatar.Icon
              icon="github"
              size={50}
              color="#000"
              style={{ backgroundColor: "none" }}
            />
          </Button>
          <Button mode="text" onPress={() => console.log("facebook")}>
            <Avatar.Icon
              icon="facebook"
              size={50}
              color="#000"
              style={{ backgroundColor: "none" }}
            />
          </Button>
        </Card.Actions>
        <Divider />
        <Card.Content style={{ marginTop: "5" }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold" }}
            variant="bodyMedium"
          >
            Register
          </Text>
          <TextInput
            label="Name"
            mode="outlined"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            label="Username"
            mode="outlined"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            label="Confirm Password"
            mode="outlined"
            secureTextEntry
            value={rePassword}
            onChangeText={setRePassword}
          />
        </Card.Content>
        <Card.Actions style={{ marginTop: "15" }}>
          <Button
            icon="account-plus-outline"
            mode="contained"
            onPress={addUserSubmit}
            textColor=""
            style={{ flex: 1 }}
            contentStyle={{ width: "100%" }}
          >
            {loading ? "...Submitting" : "Register"}
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
