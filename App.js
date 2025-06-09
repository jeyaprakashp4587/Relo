import React, {useEffect, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Navigation from './Navigation/Navigation';
import {StatusBar} from 'react-native';
import {color} from './Const/Color';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ContextProvider} from './Context/Contexter';
import MobileAds from 'react-native-google-mobile-ads';

const App = () => {
  useEffect(() => {
    MobileAds()
      .initialize()
      .then(() => console.log('Google mobile ads was initilialized'));
  }, []);

  return (
    <GestureHandlerRootView>
      <ContextProvider>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar barStyle="light-content" backgroundColor={color.black} />
        </SafeAreaProvider>
      </ContextProvider>
    </GestureHandlerRootView>
  );
};

export default App;
