import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { Camera } from 'expo-camera';
import { ImagePicker } from 'expo-image-picker';
import { Audio } from 'expo-av';

const ChatPopup = ({ visible, onClose, onSend }) => {
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleTextChange = (value) => {
    setText(value);
  };

  const handleAudioRecord = async () => {
    setIsRecording(true);
    const recording = await Audio.Recording.createAsync(
      Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    );
    await recording.startAsync();
  };

  const handleAudioStop = async () => {
    setIsRecording(false);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: false,
    });
    const result = await Audio.stopAndUnloadAsync();
    const uri = result.uri;
    const message = {
      type: 'audio',
      uri,
    };
    onSend(message);
    onClose();
  };

  const handleCameraSelect = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handleSend = () => {
    const message = {
      type: 'chat',
      text,
      photo,
    };
    onSend(message);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleCameraSelect}>
          <Image
            source={require('../../assets/camera.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAudioRecord}>
          <Image source={require('../../assets/mic.png')} style={styles.icon} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={text}
          onChangeText={handleTextChange}
        />

        {isRecording && (
          <TouchableOpacity onPress={handleAudioStop}>
            <Text>Stop</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleSend}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default ChatPopup;
