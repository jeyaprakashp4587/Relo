import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {color} from '../Const/Color';
import {Font} from '../Const/Font';

import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
const Post = () => {
  const {width, height} = Dimensions.get('window');
  // select image from user device
  const [image, setImage] = useState();
  const [isShowPostButton, setIsShowPostButton] = useState(false);
  const [loadImage, setLoadImage] = useState(false);
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
  return (
    <ScrollView
      style={{backgroundColor: color.black, flex: 1, paddingHorizontal: 15}}>
      <View>
        <Text
          style={{
            color: color.white,
            fontSize: width * 0.08,
            width: '70%',
            fontFamily: Font.SemiBold,
          }}>
          Upload your photo
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
              marginVertical: 30,
              overflow: 'hidden',
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={color.white} size={100} />
          </View>
        )}
        {image && (
          <View
            style={{
              width: width * 0.8,
              aspectRatio: 1,
              // borderWidth: 2,
              borderColor: 'red',
              borderRadius: 10,
              alignSelf: 'center',
              marginVertical: 30,
              overflow: 'hidden',
            }}>
            <FastImage
              source={{uri: image}}
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
              padding: 15,
              borderRadius: 50,
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
            style={{
              backgroundColor: color.blue,
              padding: 15,
              borderRadius: 50,
            }}>
            <Text
              style={{
                color: color.white,
                fontSize: width * 0.038,
                fontFamily: Font.Medium,
                textAlign: 'center',
              }}>
              upload
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Post;

const styles = StyleSheet.create({});
