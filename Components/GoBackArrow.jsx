import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Font} from '../Const/Font';
import {color} from '../Const/Color';

const GoBackArrow = ({text}) => {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{
        // borderWidth: 2,
        borderColor: 'red',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: 10,
      }}>
      <TouchableOpacity onPress={handleGoBack}>
        <FastImage
          source={{
            uri: 'https://i.ibb.co/4ZjfpCYC/left-arrow.png',
            priority: FastImage.priority.high,
          }}
          resizeMode="contain"
          style={{width: width * 0.08, aspectRatio: 1}}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: width * 0.06,
          fontFamily: Font.SemiBold,
          color: color.white,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default GoBackArrow;

const styles = StyleSheet.create({});
