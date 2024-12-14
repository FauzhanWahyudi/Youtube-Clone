import { useState } from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  TextInput,
} from "react-native-paper";

const DescModal = ({ visible, toggleModal, setDescription, description }) => {
  const containerStyle = {
    backgroundColor: "#3B1C32",
    padding: 20,
    margin: "10",
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={toggleModal}
        contentContainerStyle={containerStyle}
      >
        <Text>Description</Text>
        <TextInput
          value={description}
          onChangeText={(description) => setDescription(description)}
          placeholder="create descriptions"
          multiline
          className="h-72"
        />
      </Modal>
    </Portal>
  );
};

export default DescModal;
