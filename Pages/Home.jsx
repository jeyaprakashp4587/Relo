import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';

import {color} from '../Const/Color';
import {Font} from '../Const/Font';
import {useData} from '../Context/Contexter';
import PostWrapper from '../Components/PostWrapper';
import {Api} from '../Api/Api';
import Skeleton from '../skeleton/Skeleton';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const Home = () => {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  const {user} = useData();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomPost, setRandomPost] = useState([]);
  const [loading, setLoading] = useState(false);
  // Get random posts
  const getRandom = useCallback(async () => {
    try {
      setLoading(true);
      const {data, status} = await axios.get(`${Api}/Post/getRandomPair`);
      if (status === 200 && Array.isArray(data?.post)) {
        setRandomPost(prev => [...prev, ...data.post]);
      }
    } catch (error) {
      ToastAndroid.show('Error fetching posts', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getRandom();
  }, [getRandom]);
  // Triggered when snapping to a new item
  const handleTrigger = index => {
    setCurrentIndex(index);
    if (index >= randomPost.length - 2) {
      getRandom(); // Load more posts when near end
    }
  };
  // Go to next item
  const goToNext = useCallback(() => {
    if (carouselRef.current) {
      const nextIndex = (currentIndex + 1) % randomPost.length;
      carouselRef.current.scrollTo({index: nextIndex, animated: true});
    }
  }, [currentIndex, randomPost.length]);
  // Render item
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
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
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
              borderWidth: 3,
              borderColor: 'white',
            }}
          />
        </TouchableOpacity>
      </View>
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
      {/* Carousel or Skeleton */}
      {!loading ? (
        <Carousel
          ref={carouselRef}
          width={width}
          height={height * 0.65}
          data={randomPost}
          renderItem={renderItem}
          scrollAnimationDuration={1000}
          onSnapToItem={handleTrigger}
          mode={'horizontal-stack'}
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
      {/* Tutorial Text */}
      <Text
        style={{
          color: 'rgba(124, 128, 128, 0.92)',
          fontFamily: Font.SemiBold,
          fontSize: width * 0.035,
          paddingBottom: 20,
          textAlign: 'center',
        }}>
        Swipe to see
      </Text>
    </View>
  );
};
export default Home;
