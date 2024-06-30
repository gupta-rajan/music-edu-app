import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import Sound from 'react-native-sound';

interface MetronomeProps {
  bpm: number; // Beats per minute
  beatsPerCycle: number; // Number of beats per cycle
}

const Metronome: React.FC<MetronomeProps> = ({ bpm, beatsPerCycle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const [sound, setSound] = useState<Sound | null>(null);

  useEffect(() => {
    const loadMetronomeSound = async () => {
      const metronomeSound = new Sound('taal.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.error('Failed to load metronome sound', error);
          Alert.alert('Error', 'Failed to load metronome sound');
        } else {
          setSound(metronomeSound);
          console.log('Metronome sound loaded successfully');
        }
      });
    };

    loadMetronomeSound();

    return () => {
      if (sound) {
        sound.release();
        console.log('Metronome sound released');
      }
    };
  }, []);

  const playMetronome = () => {
    setIsPlaying(true);
    let count = 0;
    const interval = setInterval(() => {
      if (count < beatsPerCycle) {
        if (sound) {
          sound.setCurrentTime(0); // Reset sound position to start playing from the beginning
          sound.play((success) => {
            if (success) {
              console.log(`Playing beat ${count + 1}`);
              setBeatCount(count + 1);
              count++;
            } else {
              console.error('Failed to play metronome sound');
              clearInterval(interval);
              setIsPlaying(false);
            }
          });
        }
      } else {
        setBeatCount(0);
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, (60 / bpm) * 1000); // Calculate interval in milliseconds based on BPM
  };

  useEffect(() => {
    if (isPlaying) {
      console.log('Metronome started');
      playMetronome();
    } else {
      console.log('Metronome stopped');
    }
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        {isPlaying ? `Playing ${beatCount}/${beatsPerCycle}` : 'Metronome stopped'}
      </Text>
    </View>
  );
};

export default Metronome;

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};
