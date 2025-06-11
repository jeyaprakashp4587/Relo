import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  View,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import {color} from '../Const/Color';
import {useData} from '../Context/Contexter';
import PostWrapper from '../Components/PostWrapper';
import {Api} from '../Api/Api';
import Skeleton from '../skeleton/Skeleton';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import useFCMToken from '../Hooks/useFCMToken';
import {Text} from 'react-native-gesture-handler';
import {Font} from '../Const/Font';

const Home = () => {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  const {user} = useData();

  const carouselRef = useRef(null);
  const isScrollingRef = useRef(false);
  const isFetchingMore = useRef(false);
  const fetchCooldownRef = useRef(false);
  const currentIndexRef = useRef(0);

  const [randomPost, setRandomPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  useFCMToken();
  // Fetch random posts
  const getRandom = useCallback(async () => {
    if (isFetchingMore.current) {
      return;
    }
    isFetchingMore.current = true;
    try {
      const {data, status} = await axios.get(`${Api}/Post/getRandomPair`);
      if (status === 200 && Array.isArray(data?.post)) {
        setRandomPost(prev => {
          const newPosts = data.post.filter(
            newItem => !prev.some(old => old._id === newItem._id),
          );
          return [...prev, ...newPosts];
        });
      } else {
        console.log('No posts or invalid response');
      }
    } catch (error) {
      ToastAndroid.show('Error fetching posts', ToastAndroid.SHORT);
      console.error('Fetch error:', error);
    } finally {
      isFetchingMore.current = false;
    }
  }, []);
  useEffect(() => {
    getRandom();
  }, [getRandom]);

  const goToNext = useCallback(() => {
    if (!carouselRef.current) return;
    if (isScrollingRef.current) return;

    const nextIndex = currentIndexRef.current + 1;
    if (nextIndex >= randomPost.length) {
      if (!isFetchingMore.current) getRandom();
      return;
    }

    isScrollingRef.current = true;
    carouselRef.current.scrollTo({index: nextIndex, animated: true});
  }, [randomPost.length, getRandom]);

  // Called when the carousel snaps to a new item
  const onSnapToItem = useCallback(
    index => {
      currentIndexRef.current = index;
      setCurrentIndex(index);
      isScrollingRef.current = false;

      if (
        index >= randomPost.length - 1 &&
        !isFetchingMore.current &&
        !fetchCooldownRef.current
      ) {
        fetchCooldownRef.current = true;
        getRandom();
        setTimeout(() => {
          fetchCooldownRef.current = false;
        }, 1500);
      }
    },
    [randomPost.length, getRandom],
  );

  const renderItem = useCallback(
    ({item}) => <PostWrapper Post={item} goNext={goToNext} />,
    [goToNext],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.black,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          borderColor: 'red',
          columnGap: 10,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
              borderWidth: 1,
              borderColor: 'white',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            columnGap: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('leaderBoard')}
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <FastImage
              source={{
                uri: 'https://i.ibb.co/23R7dDMB/podium.png',
                priority: FastImage.priority.high,
              }}
              resizeMode="contain"
              style={{width: width * 0.08, aspectRatio: 1}}
            />
            <Text
              style={{
                color: color.white,
                textAlign: 'center',
                fontFamily: Font.Medium,
                fontSize: width * 0.03,
              }}>
              Leaderboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <FastImage
              source={{
                uri: 'https://i.ibb.co/B5bBhYb7/coin.png',
                priority: FastImage.priority.high,
              }}
              resizeMode="contain"
              style={{width: width * 0.08, aspectRatio: 1}}
            />
            <Text
              style={{
                color: color.white,
                textAlign: 'center',
                fontFamily: Font.Medium,
                fontSize: width * 0.03,
              }}>
              Coins: {user?.coins ?? 0}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Carousel or Skeleton */}
      {!loading ? (
        <Carousel
          ref={carouselRef}
          width={width}
          height={height * 0.6}
          data={randomPost}
          renderItem={renderItem}
          scrollAnimationDuration={4000}
          onSnapToItem={onSnapToItem}
          mode="horizontal-stack"
        />
      ) : (
        <View
          style={{
            height: height * 0.65,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
          }}>
          {[1, 2, 3].map(index => (
            <View key={index} style={{marginHorizontal: 5}}>
              <Skeleton
                width={230}
                height={index === 2 ? 300 : 220}
                radius={index === 2 ? 10 : 0}
              />
            </View>
          ))}
        </View>
      )}

      {/* Banner Ad */}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <BannerAd
          unitId={
            __DEV__ ? TestIds.BANNER : 'ca-app-pub-3257747925516984/6972244634'
          }
          size={BannerAdSize.BANNER}
          requestOptions={{requestNonPersonalizedAdsOnly: true}}
        />
      </View>
    </View>
  );
};

export default Home;
