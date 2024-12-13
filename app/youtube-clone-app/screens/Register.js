import { View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Text,
  TextInput,
  Divider,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Register({ navigation }) {
  //get insets data for safe area padding
  const insets = useSafeAreaInsets();

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
              color="#ffff"
              style={{ backgroundColor: "none" }}
            />
          </Button>
          <Button mode="text" onPress={() => console.log("github")}>
            <Avatar.Icon
              icon="github"
              size={50}
              color="#ffff"
              style={{ backgroundColor: "none" }}
            />
          </Button>
          <Button mode="text" onPress={() => console.log("facebook")}>
            <Avatar.Icon
              icon="facebook"
              size={50}
              color="#ffff"
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
          <TextInput label="Name" mode="outlined" />
          <TextInput label="Username" mode="outlined" />
          <TextInput label="Email" mode="outlined" />
          <TextInput label="Password" mode="outlined" />
        </Card.Content>
        <Card.Actions style={{ marginTop: "15" }}>
          <Button
            icon="account-plus-outline"
            mode="contained"
            onPress={() => console.log("Register")}
            textColor="#1c1c1c"
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
