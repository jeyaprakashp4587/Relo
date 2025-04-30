import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigation from './Navigation/Navigation';
import {StatusBar} from 'react-native';
import {color} from './Const/Color';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '447588547025-lmolj8v94bujck5urlne3mkc5r7nh3sh.apps.googleusercontent.com',
    });
  }, []);
  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{flex: 1, paddingTop: 15, backgroundColor: color.black}}>
        <Navigation />
        <StatusBar barStyle="light-content" backgroundColor={color.black} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
