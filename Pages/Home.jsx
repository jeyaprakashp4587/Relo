import React, {useCallback, useRef, useState} from 'react';
import {Dimensions, Text, View, TouchableOpacity, Image} from 'react-native';
import {color} from '../Const/Color';
import {Font} from '../Const/Font';
import PostWrapper from '../Components/PostWrapper';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import {useData} from '../Context/Contexter';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const {width} = Dimensions.get('window');
  const navigation = useNavigation();
  const {user} = useData();
  const data = [
    {title: 'First Item'},
    {title: 'Second Item'},
    {title: 'Third Item'},
  ];
  const carouselRef = useRef(null);
  const renderItem = useCallback(({item}) => {
    return <PostWrapper item={item} />;
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.black,
        // borderWidth: 3,
        borderColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 15,
          borderColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <FastImage
          source={require('../assets/ic_launcher_round.png')}
          resizeMode="cover"
          priority={FastImage.priority.high}
          style={{
            width: width * 0.18,
            aspectRatio: 1,
          }}
        />
        {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <FastImage
            source={{
              uri: user?.ProfileImg ?? 'https://i.ibb.co/N2gGTTk/boy2.jpg',
            }}
            resizeMode="cover"
            style={{
              width: width * 0.13,
              aspectRatio: 1,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: 'white',
            }}
          />
        </TouchableOpacity> */}
      </View>

      {/* carousel */}
      <Carousel
        ref={carouselRef}
        width={width}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
        style={{borderWidth: 0, borderColor: 'white'}}
        height={550}
        mode={'horizontal-stack'}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: 10,
          marginTop: 10,
        }}>
        <Image
          source={{uri: 'https://i.ibb.co/7xMp1Zzn/swipe.png'}}
          resizeMode="contain"
          style={{width: width * 0.14, aspectRatio: 1, tintColor: color.Bg}}
        />
        <Text
          style={{
            color: color.Bg,
            fontFamily: Font.Medium,
            fontSize: width * 0.04,
            letterSpacing: 0.4,
          }}>
          swipe to see
        </Text>
      </View>
    </View>
  );
};

export default Home;
