import { View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
export default function Login({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center">
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
          <Text variant="titleLarge" style={{ textAlign: "center" }}>
            Sign In
          </Text>
          <Text variant="bodyMedium" style={{ textAlign: "center" }}>
            to continue to YouTube
          </Text>
        </Card.Content>
        <Card.Content style={{ marginTop: "15" }}>
          <TextInput label="Email" mode="outlined" />
          <TextInput label="Password" mode="outlined" />
        </Card.Content>
        <Card.Actions className="mx-auto" style={{ marginTop: "15" }}>
          <Button
            icon="login"
            mode="contained"
            onPress={() => console.log("login")}
            textColor="#1c1c1c"
            style={{ flex: 1 }}
          >
            Login
          </Button>{" "}
          <Button
            icon="cancel"
            mode="elevated"
            buttonColor="#bf4025"
            onPress={() => console.log("logout")}
            textColor="#ffffff"
          >
            Cancel
          </Button>
        </Card.Actions>
        <Card.Content cla>
          <Text variant="bodyMedium" style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Text
              className="underline"
              style={{ fontWeight: "bold", color: "#2b37c6" }}
            >
              Sign Up
            </Text>
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}
