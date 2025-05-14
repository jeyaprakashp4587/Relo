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
  console.log(user);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.black,
        // borderWidth: 0,
        borderColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 15,
          // borderColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-between',
          // borderWidth: 0,
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
      {/* carousel and skeleton */}
      {randomPost?.length > 0 ? (
        <Carousel
          ref={carouselRef}
          width={width}
          data={randomPost}
          scrollAnimationDuration={1000}
          renderItem={({item}) => renderItem(item)}
          style={{borderWidth: 0, borderColor: 'white'}}
          height={height * 0.65}
          mode={'horizontal-stack'}
        />
      ) : (
        <View
          style={{
            borderWidth: 0,
            borderColor: 'red',
            height: height * 0.65,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            overflow: 'hidden',
          }}>
          <View style={{borderWidth: 0, borderColor: 'blue'}}>
            <Skeleton width={230} height={220} radius={10} />
          </View>
          <View
            style={{
              borderWidth: 0,
              borderColor: 'blue',
            }}>
            <Skeleton width={230} height={300} radius={10} />
          </View>
          <View style={{borderWidth: 0, borderColor: 'blue'}}>
            <Skeleton width={230} height={220} radius={10} />
          </View>
        </View>
      )}

      {/* swipe tutorial */}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: 10,
          marginTop: 10,
          // flex: 1,
          borderWidth: 0,
          borderColor: 'red',
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
