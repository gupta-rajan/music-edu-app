import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';

const Screen1 = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(8);
  const [metronome, setMetronome] = useState(null);

  const audioSettings = {
    SampleRate: 44100,
    Channels: 2,
    AudioQuality: 'High',
    AudioEncoding: 'aac',
    OutputFormat: 'mpeg_4',
    MeteringEnabled: false,
    MeasurementMode: false,
    AudioSource: 0,
  };

  useEffect(() => {
    Sound.setCategory('Playback');
    const metronomeSound = new Sound('taal.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load metronome sound', error);
        Alert.alert('Error', 'Failed to load metronome sound');
        return;
      }
      setMetronome(metronomeSound);
      console.log('Metronome sound loaded successfully');
    });

    AudioRecord.init(audioSettings);

    return () => {
      if (metronome) {
        metronome.release();
        console.log('Metronome sound released');
      }
    };
  }, []);

  const startMetronomeAndRecord = () => {
    if (isRecording) {
      console.log('Already recording...');
      return;
    }

    console.log('Starting metronome and recording');
    setIsRecording(true);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        console.log(`Countdown: ${prevCount}`);
        if (prevCount > 1) {
          return prevCount - 1;
        } else {
          clearInterval(countdownInterval);
          console.log('Countdown finished');
          startRecording();
          playMetronome();
          return 0;
        }
      });
    }, 1000);
  };

  const startRecording = () => {
    console.log('Start recording user audio');
    AudioRecord.start();
    console.log('Recording started');

    setTimeout(() => {
      AudioRecord.stop().then((audioFile) => {
        console.log('Recording stopped, audio file:', audioFile);
        // You can now handle the recorded audio file as needed (e.g., send to server)

        setTimeout(() => {
          stopRecordingAndNavigate();
        }, 1000);
      });
    }, 10000);
  };

  const playMetronome = () => {
    if (metronome) {
      const interval = (60 / 120) * 1000;
      console.log('Metronome interval: ', interval);
      metronome.play((success) => {
        if (success) {
          console.log('Successfully played metronome');
        } else {
          console.log('Failed to play metronome');
        }
      });
      setInterval(() => {
        metronome.stop(() => {
          metronome.play();
        });
      }, interval);
    } else {
      console.log('Metronome sound not loaded');
    }
  };

  const stopRecordingAndNavigate = () => {
    console.log('Stopping recording and metronome');
    if (metronome) {
      metronome.stop();
    }
    setIsRecording(false);
    console.log('Navigating to Screen2');
    navigation.navigate('Screen2');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={isRecording ? stopRecordingAndNavigate : startMetronomeAndRecord}>
        <Text style={styles.recordButton}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>
      <Text style={styles.countdownText}>{countdown > 0 ? countdown : ''}</Text>
    </View>
  );
};

export default Screen1;

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButton: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
  },
  countdownText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
};
