import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigation from './Navigation/Navigation';
import {StatusBar} from 'react-native';
import {color} from './Const/Color';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ContextProvider} from './Context/Contexter';

const App = () => {
  return (
    <GestureHandlerRootView>
      <ContextProvider>
        <SafeAreaView
          style={{flex: 1, paddingTop: 0, backgroundColor: color.black}}>
          <Navigation />
          <StatusBar barStyle="light-content" backgroundColor={color.black} />
        </SafeAreaView>
      </ContextProvider>
    </GestureHandlerRootView>
  );
};

export default App;
