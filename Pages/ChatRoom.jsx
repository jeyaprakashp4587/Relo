import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useData} from '../Context/Contexter';

const ChatRoom = () => {
  const {user} = useData();
  return (
    <ImageBackground
      source={{
        uri: 'https://i.ibb.co/RT9Vsycp/Chat-GPT-Image-Jun-4-2025-10-38-10-PM.png',
      }}
      style={{flex: 1, rowGap: 25}}></ImageBackground>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
