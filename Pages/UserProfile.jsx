import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {color} from '../Const/Color';
import axios from 'axios';
import {Api} from '../Api/Api';
import FastImage from 'react-native-fast-image';
import {Font} from '../Const/Font';
import GoBackArrow from '../Components/GoBackArrow';
import LinearGradient from 'react-native-linear-gradient';
import {useData} from '../Context/Contexter';

const UserProfile = () => {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  const {userId} = useRoute().params;
  const [selectedUser, setSelectedUser] = useState();
  const getUser = useCallback(async () => {
    try {
      const {data, status} = await axios.get(
        `${Api}/Profile/getUser/${userId}`,
      );
      if (status === 200) {
        setSelectedUser(data);
      }
    } catch (error) {
      ToastAndroid.show('Error on get selected user', ToastAndroid.SHORT);
    }
  }, [userId]);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <ImageBackground
      source={{
        uri: 'https://i.ibb.co/RT9Vsycp/Chat-GPT-Image-Jun-4-2025-10-38-10-PM.png',
      }}
      style={{flex: 1, rowGap: 25}}>
      {/* header */}
      <View style={{paddingHorizontal: 15}}>
        <GoBackArrow text="User profile" />
      </View>
      {/* selectedUser profile */}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          source={{uri: selectedUser?.ProfileImg}}
          style={{
            width: width * 0.3,
            aspectRatio: 1,
            borderRadius: 100,
            borderColor: color.white,
            borderWidth: 3,
          }}
        />
        <Text
          style={{
            color: color.white,
            fontFamily: Font.SemiBold,
            fontSize: width * 0.09,
          }}>
          {selectedUser?.Name}
        </Text>
      </View>
      {/* show message to selectedUser */}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('chatRoom', {
              ChatuserData: {
                ChatUserName: selectedUser?.Name,
                ChatUserImage: selectedUser?.ProfileImg,
                ChatUserId: userId,
              },
            });
          }}
          style={{
            backgroundColor: color.white,
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            height: height * 0.06,
            borderRadius: 30,
          }}>
          <Text style={{color: color.black, fontFamily: Font.SemiBold}}>
            Send a message
          </Text>
        </TouchableOpacity>
      </View>
      {/* show selectedUser posts */}
      <View style={{paddingHorizontal: 15}}>
        <Text
          style={{
            color: color.white,
            fontFamily: Font.Medium,
            fontSize: width * 0.06,
            marginVertical: 10,
          }}>
          Posts
        </Text>
        <FlatList
          data={selectedUser?.Post}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?._id}
          contentContainerStyle={{
            rowGap: 10,
            justifyContent: 'space-between',
            borderColor: 'red',
            width: '100%',
            flexWrap: 'wrap',
            // borderWidth: 1,
          }}
          horizontal={true}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                width: width * 0.44,
                borderRadius: 5,
                overflow: 'hidden',
              }}>
              <FastImage
                source={{uri: item?.PostImage}}
                style={{width: '100%', aspectRatio: 1}}
              />
              {/* show dominator */}
              <LinearGradient
                colors={[
                  item?.PostStatus == 'Tied'
                    ? 'rgb(185, 104, 57)'
                    : item?.PostStatus == 'Dominated'
                    ? color.blue
                    : 'rgb(102, 116, 22)',
                  'rgba(0, 0, 0, 0.09)',
                ]}
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 5,
                  position: 'absolute',
                  width: '100%',
                  bottom: 0,
                }}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}>
                <Text
                  style={{
                    color: color.white,
                    fontFamily: Font.SemiBold,
                    letterSpacing: 0.4,
                    fontSize: width * 0.035,
                  }}>
                  {item?.PostStatus}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
