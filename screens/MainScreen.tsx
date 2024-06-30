import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Screen1')}>
        <Text style={styles.button}>Go to Screen1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Screen2')}>
        <Text style={styles.button}>Go to Screen2</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
  },
};
