import { useState } from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  TextInput,
} from "react-native-paper";

const ThumbnailModal = ({
  visibleThumbnailModal,
  toggleThumbnailModal,
  setThumbnail,
  thumbnail,
}) => {
  const containerStyle = {
    backgroundColor: "#ffff",
    padding: 20,
    margin: "10",
  };

  return (
    <Portal>
      <Modal
        visible={visibleThumbnailModal}
        onDismiss={toggleThumbnailModal}
        contentContainerStyle={containerStyle}
      >
        <Text> Upload Thumbnail</Text>
        <TextInput
          value={thumbnail}
          onChangeText={(thumbnail) => setThumbnail(thumbnail)}
          placeholder="insert thumbnail link"
        />
      </Modal>
    </Portal>
  );
};

export default ThumbnailModal;
