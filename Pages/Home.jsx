import React, {useRef} from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import {color} from '../Const/Color';
import {Font} from '../Const/Font';
import PostWrapper from '../Components/PostWrapper';
import Carousel from 'react-native-reanimated-carousel';

const Home = () => {
  const {width, height} = Dimensions.get('window');
  const data = [
    {title: 'First Item'},
    {title: 'Second Item'},
    {title: 'Third Item'},
  ];
  const carouselRef = useRef(null);

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
      {/* carousel */}
      <Carousel
        width={width * 1}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({item}) => <PostWrapper />}
      />
    </View>
  );
};

export default Home;
