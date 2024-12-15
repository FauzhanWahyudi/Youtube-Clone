import * as SecureStore from "expo-secure-store";
import { useMutation } from "@apollo/client";
import { View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { LOGIN } from "../mutations/login";
import { useContext, useState } from "react";
import AuthContext from "../contexts/auth";

export default function Login({ navigation }) {
  const { setIsSignedIn } = useContext(AuthContext);

  const [loginSubmit, { loading }] = useMutation(LOGIN);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    try {
      console.log("login");
      const { data } = await loginSubmit({
        variables: {
          body: {
            password,
            username,
          },
        },
      });
      const access_token = data.login.access_token;
      if (!access_token) throw new Error("Invalid username/password");
      await SecureStore.setItemAsync("access_token", access_token);
      setIsSignedIn(true);
    } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
      // return <Text>{error}</Text>;
    }
  };

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
            width: 110,
            height: 100,
            objectFit: "cover",
            marginHorizontal: "auto",
          }}
        />
        <Card.Content style={{ marginTop: "10" }}>
          <Text variant="headlineLarge" style={{ textAlign: "center" }}>
            Login
          </Text>
          <Text
            variant="bodyMedium"
            style={{ textAlign: "center", marginTop: "5" }}
          >
            to continue to YouTube
          </Text>
        </Card.Content>
        <Card.Content style={{ marginTop: "15" }}>
          <TextInput
            label="Username"
            mode="outlined"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </Card.Content>
        <Card.Actions style={{ marginTop: "15" }}>
          <Button
            icon="login"
            mode="contained"
            onPress={() => {
              login();
            }}
            textColor="#1c1c1c"
            style={{ flex: 1 }}
            contentStyle={{ width: "100%" }}
          >
            Login
          </Button>
        </Card.Actions>
        <Card.Actions style={{ marginTop: 0 }}>
          <Button
            icon="account-plus-outline"
            mode="text"
            onPress={() => {
              console.log("register");
              navigation.navigate("Register");
            }}
            textColor="#ffff"
            style={{ flex: 1 }}
            contentStyle={{ width: "100%" }}
          >
            Register
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
