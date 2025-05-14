import {View, Text, Dimensions, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {color} from '../Const/Color';
import {Font} from '../Const/Font';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Skeleton from '../skeleton/Skeleton';
import {useData} from '../Context/Contexter';

const Profile = () => {
  const {width, height} = Dimensions.get('window');
  const {user} = useData();
  return (
    <View style={{backgroundColor: color.black, flex: 1}}>
      <Text
        style={{
          paddingHorizontal: 15,
          color: color.white,
          fontSize: width * 0.1,
          fontFamily: Font.SemiBold,
        }}>
        Profile
      </Text>
      {/* profile */}
      <View
        style={{
          paddingHorizontal: 15,
          marginTop: 10,
          flexDirection: 'row',
          columnGap: 20,
          alignItems: 'center',
        }}>
        <FastImage
          source={{
            uri: 'https://i.ibb.co/8gPTcpK/girl1.jpg',
            priority: FastImage.priority.high,
          }}
          resizeMode="contain"
          style={{
            width: width * 0.3,
            aspectRatio: 1,
            borderRadius: 1000,
            borderWidth: 5,
            borderColor: color.white,
          }}
        />
        <View>
          <Text
            style={{
              color: color.white,
              fontFamily: Font.Medium,
              fontSize: width * 0.05,
            }}>
            Jeya Prakash
          </Text>
          <View>
            <Text
              style={{
                color: color.white,
                fontFamily: Font.Regular,
                fontSize: width * 0.04,
              }}>
              uploads
            </Text>
            <Text
              style={{
                color: color.white,
                fontFamily: Font.Regular,
                fontSize: width * 0.04,
              }}>
              0
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          borderWidth: 0.5,
          // borderColor: color.white,
          padding: 10,
          marginVertical: 15,
          marginHorizontal: 15,
          borderRadius: 90,
          backgroundColor: color.blue,
        }}>
        <Text
          style={{
            color: color.white,
            textAlign: 'center',
            fontFamily: Font.Medium,
            // letterSpacing: 0.4,
            fontSize: width * 0.035,
          }}>
          Edit Profile
        </Text>
      </TouchableOpacity>
      {/*show all posts */}
      {user?.Post?.length > 0 ? (
        <View style={{borderWidth: 0, borderColor: color.blue, flex: 1}}>
          <Text
            style={{
              paddingHorizontal: 15,
              color: color.white,
              fontFamily: Font.Medium,
              fontSize: width * 0.055,
              paddingBottom: 10,
            }}>
            uploads
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              rowGap: 10,
              paddingHorizontal: 15,
            }}>
            <FlatList
              data={user?.Post}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  key={index}
                  style={{borderRadius: 5, overflow: 'hidden'}}>
                  <FastImage
                    source={{
                      uri: item?.PostImage,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode="contain"
                    style={{
                      width: width * 0.45,
                      aspectRatio: 1,
                      borderRadius: 5,
                    }}
                  />
                  {/* show dominator */}
                  <LinearGradient
                    colors={[
                      item?.PostStatus == 'Tied'
                        ? 'rgb(185, 104, 57)'
                        : item?.PostStatus == 'Dominated'
                        ? color.blue
                        : 'rgb(102, 116, 22)',
                      'rgba(0, 0, 0, 0.09)',
                    ]}
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: 5,
                      position: 'absolute',
                      width: '100%',
                      bottom: 0,
                    }}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 0}}>
                    <Text
                      style={{
                        color: color.white,
                        fontFamily: Font.Medium,
                        letterSpacing: 0.4,
                        fontSize: width * 0.025,
                      }}>
                      {item?.PostStatus}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text
            style={{
              color: color.white,
              fontFamily: Font.Medium,
              textAlign: 'center',
            }}>
            No more posts
          </Text>
        </View>
      )}
    </View>
  );
};

export default Profile;
