import React from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import {color} from '../Const/Color';
import {Font} from '../Const/Font';
import PostWrapper from '../Components/PostWrapper';

const Home = () => {
  const {width, height} = Dimensions.get('window');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.black,
      }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 15,
          // borderWidth: 1,
          borderColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: color.white,
            fontFamily: Font.SemiBold,
            fontSize: width * 0.07,
          }}>
          Relo
        </Text>
      </View>
      {Array.from({length: 5}).map(() => (
        <PostWrapper />
      ))}
    </View>
  );
};

export default Home;
