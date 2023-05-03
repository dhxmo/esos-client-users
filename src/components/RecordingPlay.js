import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../globals/style';

export const RecordingPlay = ({ recording }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (recording && recording.data) {
      (async () => {
        await loadSound();
      })();
    }
  }, [recording]);

  const loadSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: recording.data,
      });
      setSound(newSound);
    } catch (err) {
      console.error('Failed to load sound', err);
    }
  };

  const playSound = async () => {
    try {
      console.log('Playing Sound');
      setIsPlaying(true);

      await sound.playAsync();
    } catch (err) {
      console.error('Failed to play sound', err);
    }
  };

  const stopSound = async () => {
    try {
      await sound.stopAsync();
      setIsPlaying(false);
    } catch (err) {
      console.error('Failed to stop sound', err);
    }
  };

  if (!recording || !recording.data || !sound) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={async () => {
          isPlaying ? await stopSound() : await playSound();
        }}
        style={styles.button}
      >
        {isPlaying ? (
          <Text style={styles.buttonText}>Stop Recording</Text>
        ) : (
          <Text style={styles.buttonText}>Play Recording</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.red,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
