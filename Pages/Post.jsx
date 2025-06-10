import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {color} from '../Const/Color';
import {Font} from '../Const/Font';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {Api} from '../Api/Api';
import {useData} from '../Context/Contexter';
import GoBackArrow from '../Components/GoBackArrow';

const Post = () => {
  const {width, height} = Dimensions.get('window');
  const {user, setUser} = useData();
  // select image from user device
  const [image, setImage] = useState();
  const [isShowPostButton, setIsShowPostButton] = useState(false);
  const [loadImage, setLoadImage] = useState(false);
  const [message, setMessage] = useState('');
  const selectImage = useCallback(async () => {
    const result = await launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
    });
    if (result.didCancel) {
      setLoadImage(false);
      setIsShowPostButton(false);
    } else if (!result.didCancel) {
      const imageuri = await hostImage(result.assets[0].uri);
      if (imageuri) {
        setLoadImage(false);
        setIsShowPostButton(true);
        setImage(imageuri);
      }
    }
  }, []);
  const hostImage = useCallback(async imageUri => {
    try {
      setLoadImage(true);
      const data = new FormData();
      data.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'Post.jpg',
      });
      data.append('upload_preset', 'ml_default');
      data.append('api_key', 'QDS4FXo9kE4R3L4rKUsb8FFH8gU');
      let res = await fetch(
        'https://api.cloudinary.com/v1_1/dv72gyrn1/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );
      let result = await res.json();
      return await result.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoadImage(false);
      throw error;
    }
  }, []);
  const [uploadIndi, setUploadIndi] = useState(false);
  const uploadPost = useCallback(async () => {
    try {
      setUploadIndi(true);
      const {status, data} = await axios.post(`${Api}/Post/uploadPost`, {
        userId: user?._id,
        Image: image,
        Message: message,
      });
      if (status === 200) {
        ToastAndroid.show('upload successfully', ToastAndroid.SHORT);
        setImage('https://i.ibb.co/gFZm4vmK/close-up-gibbon-nature.jpg');
        setIsShowPostButton(false);
        setUser({...prev, Posts: data?.newPost});
        setUploadIndi(false);
      }
    } catch (error) {
      setImage('https://i.ibb.co/gFZm4vmK/close-up-gibbon-nature.jpg');
      setUploadIndi(false);
      setIsShowPostButton(false);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }, [image, user]);
  return (
    <ScrollView
      style={{backgroundColor: color.black, flex: 1}}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={{
          uri: 'https://i.ibb.co/RT9Vsycp/Chat-GPT-Image-Jun-4-2025-10-38-10-PM.png',
        }}
        style={{flex: 1, height: height * 1, paddingHorizontal: 15}}>
        <GoBackArrow text="Post" />
        <Text
          style={{
            color: color.white,
            fontSize: width * 0.07,
            fontFamily: Font.SemiBold,
            marginBottom: 10,
          }}>
          Upload your post
        </Text>
        {/* show selected image */}
        {loadImage && (
          <View
            style={{
              width: width * 0.8,
              aspectRatio: 1,
              // borderWidth: 2,
              borderColor: 'red',
              borderRadius: 10,
              alignSelf: 'center',
              marginVertical: 20,
              overflow: 'hidden',
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={color.white} size={100} />
          </View>
        )}
        {!loadImage && (
          <View
            style={{
              width: width * 0.9,
              aspectRatio: 1,
              borderColor: 'red',
              borderRadius: 10,
              alignSelf: 'center',
              marginVertical: 20,
              overflow: 'hidden',
            }}>
            <FastImage
              source={{
                uri:
                  image ??
                  'https://i.ibb.co/gFZm4vmK/close-up-gibbon-nature.jpg',
              }}
              resizeMode="cover"
              priority={FastImage.priority.high}
              style={{width: '100%', height: '100%'}}
            />
          </View>
        )}
        {!isShowPostButton && (
          <TouchableOpacity
            onPress={selectImage}
            style={{
              backgroundColor: color.blue,
              borderRadius: 50,
              height: height * 0.068,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: color.white,
                fontSize: width * 0.038,
                fontFamily: Font.Medium,
                textAlign: 'center',
              }}>
              choose a image
            </Text>
          </TouchableOpacity>
        )}
        {isShowPostButton && (
          <TouchableOpacity
            disabled={uploadIndi}
            onPress={uploadPost}
            style={{
              backgroundColor: color.blue,
              // padding: 15,
              borderRadius: 50,
              height: height * 0.068,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {uploadIndi ? (
              <ActivityIndicator size={29} />
            ) : (
              <Text
                style={{
                  color: color.white,
                  fontSize: width * 0.038,
                  fontFamily: Font.Medium,
                  textAlign: 'center',
                }}>
                upload
              </Text>
            )}
          </TouchableOpacity>
        )}
        {isShowPostButton && (
          <View
            style={{
              backgroundColor: 'rgba(98, 100, 102, 0.33)',
              padding: 15,
              marginTop: 15,
              borderRadius: 5,
              rowGap: 10,
            }}>
            <Text
              style={{
                fontSize: width * 0.06,
                fontFamily: Font.Medium,
                color: color.white,
                lineHeight: 35,
              }}>
              What is your {'\n'}thanks message?
            </Text>
            <TextInput
              placeholder="Ex: Thanks for voting me"
              placeholderTextColor={color.white}
              maxLength={30}
              style={{
                borderWidth: 0.4,
                borderColor: 'rgba(156, 156, 156, 0.6))',
                borderRadius: 30,
                paddingHorizontal: 15,
                fontSize: width * 0.032,
              }}
            />
          </View>
        )}
      </ImageBackground>
    </ScrollView>
  );
};

export default Post;

const styles = StyleSheet.create({});
