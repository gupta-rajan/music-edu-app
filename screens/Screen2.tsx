import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';

const Screen2 = () => {
  const [tracks, setTracks] = useState([]);
  const [volumes, setVolumes] = useState([1, 1, 1, 1]);

  useEffect(() => {
    const trackFiles = ['rhythm.mp3', 'taal.mp3', 'tanpura.mp3', 'Violin.mp3'];
    const loadedTracks = trackFiles.map((file, index) => {
      const sound = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log(`Failed to load track ${file}`, error);
          return;
        }
      });
      return sound;
    });
    setTracks(loadedTracks);

    return () => {
      loadedTracks.forEach(track => {
        track.release();
      });
    };
  }, []);

  const playTracks = () => {
    tracks.forEach(track => {
      track.setVolume(volumes[tracks.indexOf(track)]);
      track.play((success) => {
        if (!success) {
          console.log('Failed to play track');
        }
      });
    });
  };

  const changeVolume = (index, value) => {
    const newVolumes = [...volumes];
    newVolumes[index] = value;
    setVolumes(newVolumes);
    tracks[index].setVolume(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playTracks}>
        <Text style={styles.playButton}>Play Tracks</Text>
      </TouchableOpacity>
      {tracks.map((_, index) => (
        <View key={index} style={styles.sliderContainer}>
          <Text>Track {index + 1} Volume</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={volumes[index]}
            onValueChange={(value) => changeVolume(index, value)}
          />
        </View>
      ))}
    </View>
  );
};

export default Screen2;

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'purple',
    color: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
  },
  sliderContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
};
