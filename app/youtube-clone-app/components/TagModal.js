import { useState } from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  TextInput,
} from "react-native-paper";

const TagModal = ({ visibleTagModal, toggleTagModal, setTags, tags }) => {
  const containerStyle = {
    backgroundColor: "#ffff",
    padding: 20,
    margin: "10",
  };

  return (
    <Portal>
      <Modal
        visible={visibleTagModal}
        onDismiss={toggleTagModal}
        contentContainerStyle={containerStyle}
      >
        <Text>Tags</Text>
        <TextInput
          value={tags}
          onChangeText={(tags) => setTags(tags)}
          placeholder="create tags"
        />
        <Text variant="titleSmall">
          please use "," to divide multiple tags,
        </Text>
        <Text variant="titleSmall">ex: comedy,military,romance</Text>
      </Modal>
    </Portal>
  );
};

export default TagModal;
