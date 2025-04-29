import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigation from './Navigation/Navigation';
import {StatusBar} from 'react-native';
import {color} from './Const/Color';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{flex: 1}}>
        <Navigation />
        <StatusBar barStyle="light-content" backgroundColor={color.black} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
