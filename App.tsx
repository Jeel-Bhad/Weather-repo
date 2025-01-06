import React, { } from 'react';
import { Text, View } from 'react-native';
import Weather from './src/weather/Weather';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
 return(
  <GestureHandlerRootView>
    <Weather></Weather>
  </GestureHandlerRootView>
 
 )
};
export default App;
