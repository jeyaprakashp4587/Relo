import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useData} from '../Context/Contexter';
import GoBackArrow from '../Components/GoBackArrow';
import FastImage from 'react-native-fast-image';
import {color} from '../Const/Color';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Api} from '../Api/Api';

const ChatRoom = () => {
  const {ChatuserData} = useRoute().params;
  console.log(ChatuserData);

  const {user} = useData();
  const {width, height} = Dimensions.get('window');
  const [chats, setChats] = useState([]);
  const message = useRef(null);
  const textInput = useRef(null);
  const handleSetMessage = text => {
    message.current = text;
  };
  const handleSendMessage = useCallback(async () => {
    const {status, data} = await axios.post(`${Api}/Chat/sendMessage`, {
      receiver: ChatuserData?.ChatUserId,
      sender: user?._id,
      message: message.current,
    });
    message.current = '';
    textInput.current?.clear();
  }, [ChatuserData, user, textInput, message]);
  // fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      const {data, status} = await axios.get(`${Api}/Chat/getMessages`, {
        params: {
          receiver: ChatuserData?.ChatUserId,
          sender: user?._id,
        },
      });
      if (status === 200) {
        setChats(data.chats);
      }
    } catch (error) {
      ToastAndroid.show('error get messages', ToastAndroid.SHORT);
    }
  }, []);
  useEffect(() => {
    fetchMessages();
  }, []);
  const MessageUi = useCallback(({chats}) => {
    return (
      <View
        style={{
          // borderWidth: 1,
          borderColor: 'yellow',
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        {/* <FastImage source={{uri: u}} /> */}
        <Text
          style={{
            color: color.white,
            textAlign: 'left',
            backgroundColor: 'rgba(136, 139, 139, 0.37)',
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            borderLeftWidth: 3,
            borderColor: 'rgb(69, 100, 184)',
          }}>
          {chats?.msg}
        </Text>
      </View>
    );
  });
  return (
    <ImageBackground
      source={{
        uri: 'https://i.ibb.co/RT9Vsycp/Chat-GPT-Image-Jun-4-2025-10-38-10-PM.png',
      }}
      style={{flex: 1, rowGap: 15, paddingHorizontal: 15}}>
      {/* Header  */}
      <GoBackArrow text="Chat room" />
      {/* chat view */}
      <View style={{borderWidth: 0, borderColor: 'red', flex: 1}}>
        <FlatList
          data={chats}
          keyExtractor={item => item?._id}
          renderItem={({item, index}) => <MessageUi chats={item} />}
        />
      </View>
      {/* textInput view */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 0,
          alignItems: 'center',
          marginBottom: 20,
          columnGap: 10,
        }}>
        <TextInput
          ref={textInput}
          style={{
            borderWidth: 0.8,
            borderColor: color.Bg,
            flex: 1,
            borderRadius: 100,
            paddingHorizontal: 25,
            height: height * 0.07,
            color: color.veryLightGrey,
          }}
          onChangeText={handleSetMessage}
          multiline={true}
          placeholderTextColor={color.veryLightGrey}
          placeholder="Type something..."
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          style={{
            backgroundColor: 'rgba(165, 168, 163, 0.26)',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            height: height * 0.07,
            aspectRatio: 1,
          }}>
          <FastImage
            source={{uri: 'https://i.ibb.co/GvVqd7X0/send.png'}}
            resizeMode="contain"
            style={{width: width * 0.06, aspectRatio: 1}}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
