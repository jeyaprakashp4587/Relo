import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {color} from '../Const/Color';
import FastImage from 'react-native-fast-image';
import {Font} from '../Const/Font';
import LinearGradient from 'react-native-linear-gradient';

const PostWrapper = () => {
  const {width, height} = Dimensions.get('window');
  const boyProfileImages = [
    'https://i.ibb.co/N1q9xbz/boy3.jpg',
    'https://i.ibb.co/N2gGTTk/boy2.jpg',
    'https://i.ibb.co/4RJhQBn/boy1.jpg',
  ];
  const girlProfileImages = [
    'https://i.ibb.co/T8sbxRd/girl2.jpg',
    'https://i.ibb.co/8gPTcpK/girl1.jpg',
    'https://i.ibb.co/s2bB4yj/girl3.jpg',
  ];
  return (
    <View
      style={{
        // borderWidth: 5,
        borderColor: 'red',
        height: height * 0.6,
        marginVertical: 'auto',
      }}>
      {/* first user */}
      <View
        style={{
          // borderWidth: 1,
          borderColor: 'red',
          flexDirection: 'row',
          flex: 1,
        }}>
        <View style={{borderWidth: 0, borderColor: 'red', width: '50%'}}>
          <FastImage
            source={{
              uri: 'https://i.ibb.co/N2gGTTk/boy2.jpg',
              priority: FastImage.priority.high,
            }}
            resizeMode="cover"
            style={{width: '100%', height: '100%', borderRadius: 10}}
          />
        </View>
        <View
          style={{
            borderWidth: 0,
            borderColor: 'red',
            flex: 1,
            padding: 15,
            flexDirection: 'column',
            justifyContent: 'center',
            rowGap: 15,
          }}>
          {/* profile info */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 8,
              backgroundColor: color.Bg,
              padding: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <FastImage
              source={{
                uri: 'https://i.ibb.co/N2gGTTk/boy2.jpg',
                priority: FastImage.priority.high,
              }}
              resizeMode="contain"
              style={{width: 30, aspectRatio: 1, borderRadius: 50}}
            />
            <Text
              style={{
                color: color.white,
                fontFamily: Font.Regular,
                fontSize: width * 0.036,
                letterSpacing: 0.2,
              }}>
              Jeya Prakash
            </Text>
          </View>
          {/* image info */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View>
              <FastImage
                source={{uri: 'https://i.ibb.co/VrbW9xf/bolt.png'}}
                resizeMode="contain"
                style={{width: 20, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontSize: width * 0.027}}>
                20
              </Text>
            </View>
            <View>
              <FastImage
                source={{uri: 'https://i.ibb.co/B5kH5kfv/increase.png'}}
                resizeMode="contain"
                style={{width: 20, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontSize: width * 0.027}}>
                563
              </Text>
            </View>
            <View>
              <FastImage
                source={{uri: 'https://i.ibb.co/w3LB3gg/decrease.png'}}
                resizeMode="contain"
                style={{width: 20, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontSize: width * 0.027}}>
                100
              </Text>
            </View>
          </View>
          {/* vote button */}
          <LinearGradient
            colors={['#e6004c', '#ff1a66']}
            style={{borderRadius: 10}}>
            <TouchableOpacity
              style={{
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <Image
                source={{uri: 'https://i.ibb.co/60TH14Kx/paws.png'}}
                style={{width: 13, aspectRatio: 1, tintColor: 'white'}}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: color.white,
                  textAlign: 'center',
                  fontFamily: Font.Regular,
                  fontSize: width * 0.032,
                  letterSpacing: 0.3,
                }}>
                vote
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      {/* center label */}
      <View
        style={{
          width: 35,
          aspectRatio: 1,
          backgroundColor: color.white,
          position: 'absolute',
          zIndex: 10,
          alignSelf: 'center',
          marginVertical: 'auto',
          top: '45%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
        }}>
        <FastImage
          source={{
            uri: 'https://i.ibb.co/ZR9L9NWc/radiation.png',
            priority: FastImage.priority.high,
          }}
          style={{width: 24, aspectRatio: 1}}
          resizeMethod="resize"
        />
      </View>
      {/* second user */}
      <View
        style={{
          flexDirection: 'row-reverse',
          flex: 1,
        }}>
        <View style={{borderWidth: 0, borderColor: 'red', width: '50%'}}>
          <FastImage
            source={{
              uri: 'https://i.ibb.co/8gPTcpK/girl1.jpg',
              priority: FastImage.priority.high,
            }}
            style={{width: '100%', height: '100%', borderRadius: 10}}
          />
        </View>
        <View
          style={{
            borderWidth: 0,
            borderColor: 'red',
            padding: 15,
            width: '50%',
            flexDirection: 'column',
            justifyContent: 'center',
            rowGap: 15,
          }}>
          {/* profile info */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 8,
              backgroundColor: color.Bg,
              padding: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <FastImage
              source={{
                uri: 'https://i.ibb.co/s2bB4yj/girl3.jpg',
                priority: FastImage.priority.high,
              }}
              resizeMode="contain"
              style={{width: 30, aspectRatio: 1, borderRadius: 50}}
            />
            <Text
              style={{
                color: color.white,
                fontFamily: Font.Regular,
                fontSize: width * 0.036,
                letterSpacing: 0.2,
              }}>
              Relo
            </Text>
          </View>
          {/* image info */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View>
              <FastImage
                source={{uri: 'https://i.ibb.co/VrbW9xf/bolt.png'}}
                resizeMode="contain"
                style={{width: 20, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontSize: width * 0.027}}>
                23
              </Text>
            </View>
            <View>
              <FastImage
                source={{uri: 'https://i.ibb.co/B5kH5kfv/increase.png'}}
                resizeMode="contain"
                style={{width: 20, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontSize: width * 0.027}}>
                53
              </Text>
            </View>
            <View>
              <FastImage
                source={{uri: 'https://i.ibb.co/w3LB3gg/decrease.png'}}
                resizeMode="contain"
                style={{width: 20, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontSize: width * 0.027}}>
                10
              </Text>
            </View>
          </View>
          {/* vote button */}
          <LinearGradient
            colors={['#99c2ff', '#0080ff']}
            style={{borderRadius: 10}}>
            <TouchableOpacity
              style={{
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <Image
                source={{uri: 'https://i.ibb.co/60TH14Kx/paws.png'}}
                style={{width: 13, aspectRatio: 1, tintColor: 'white'}}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: color.white,
                  textAlign: 'center',
                  fontFamily: Font.Regular,
                  fontSize: width * 0.032,
                  letterSpacing: 0.3,
                }}>
                vote
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default PostWrapper;

const styles = StyleSheet.create({});
