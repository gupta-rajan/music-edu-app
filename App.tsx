import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, Text } from 'react-native';
import Screen1 from './screens/Screen';
import Screen2 from './screens/Screen2';
const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Screen1')}>
        <Text style={styles.button}>Go to Screen 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Screen2')}>
        <Text style={styles.button}>Go to Screen 2</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

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
