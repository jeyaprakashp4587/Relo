import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, Text, View, TouchableOpacity, Image} from 'react-native';
import {color} from '../Const/Color';
import {Font} from '../Const/Font';
import PostWrapper from '../Components/PostWrapper';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import {useData} from '../Context/Contexter';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Api} from '../Api/Api';
import Skeleton from '../skeleton/Skeleton';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const Home = () => {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  const {user} = useData();
  const data = [
    {title: 'First Item'},
    {title: 'Second Item'},
    {title: 'Third Item'},
  ];
  const carouselRef = useRef(null);
  const renderItem = useCallback(post => {
    return <PostWrapper Post={post} />;
  }, []);
  // get the random post
  const [randomPost, setRandomPost] = useState();
  const [showEmpty, setShowEmpty] = useState(false);
  const getRandom = useCallback(async () => {
    try {
      const {data, status} = await axios.get(`${Api}/Post/getRandomPair`);
      if (status === 200) {
        setRandomPost(data?.post);
      }
    } catch (error) {}
  }, [user]);
  useEffect(() => {
    getRandom();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.black,
        // borderWidth: 8,
        borderColor: 'red',
        flexDirection: 'column',
        // justifyContent: 'flex-start',
        rowGap: 10,
        justifyContent: 'space-between',
      }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 15,
          borderColor: 'blue',
          flexDirection: 'row',
          justifyContent: 'space-between',
          // borderWidth: 2,
          paddingVertical: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <FastImage
            source={{
              uri: user?.ProfileImg ?? 'https://i.ibb.co/N2gGTTk/boy2.jpg',
            }}
            resizeMode="cover"
            style={{
              width: width * 0.17,
              aspectRatio: 1,
              borderRadius: 50,
              // borderWidth: 3,
              borderColor: 'white',
            }}
          />
        </TouchableOpacity>
      </View>
      {/* Banner add */}
      <View
        style={{
          borderColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          // borderWidth: 2,
        }}>
        <BannerAd
          unitId={
            __DEV__ ? TestIds.BANNER : 'ca-app-pub-3257747925516984/6972244634'
          }
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
      {/* carousel and skeleton */}
      {randomPost?.length > 0 ? (
        <Carousel
          ref={carouselRef}
          width={width}
          data={randomPost}
          scrollAnimationDuration={1000}
          renderItem={({item}) => renderItem(item)}
          style={{borderWidth: 0, borderColor: 'white', flex: 1}}
          height={height * 0.65}
          mode={'horizontal-stack'}
        />
      ) : (
        <View
          style={{
            // borderWidth: 2,
            // borderColor: 'red',
            height: height * 0.65,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            overflow: 'hidden',
            flex: 1,
          }}>
          <View style={{borderWidth: 0, borderColor: 'blue'}}>
            <Skeleton width={230} height={220} radius={0} />
          </View>
          <View
            style={{
              borderWidth: 0,
              borderColor: 'blue',
            }}>
            <Skeleton width={230} height={300} radius={10} />
          </View>
          <View style={{borderWidth: 0, borderColor: 'blue'}}>
            <Skeleton width={230} height={220} radius={0} />
          </View>
        </View>
      )}
      {/* tutorial text */}
      <Text
        style={{
          color: color.veryLightGrey,
          fontFamily: Font.Medium,
          fontSize: width * 0.035,
          paddingBottom: 20,
          textAlign: 'center',
          letterSpacing: 0.4,
        }}>
        swipe to see
      </Text>
    </View>
  );
};

export default Home;
