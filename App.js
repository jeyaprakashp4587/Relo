import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigation from './Navigation/Navigation';
import {StatusBar} from 'react-native';
import {color} from './Const/Color';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigation />
      <StatusBar barStyle="light-content" backgroundColor={color.black} />
    </SafeAreaView>
  );
};

export default App;
