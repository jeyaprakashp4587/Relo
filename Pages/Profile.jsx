import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {color} from '../Const/Color';
import {Font} from '../Const/Font';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Skeleton from '../skeleton/Skeleton';
import {useData} from '../Context/Contexter';
import GoBackArrow from '../Components/GoBackArrow';

const Profile = () => {
  const {width, height} = Dimensions.get('window');
  const {user} = useData();
  console.log(user?.Post);

  return (
    <ImageBackground
      source={{
        uri: 'https://i.ibb.co/RT9Vsycp/Chat-GPT-Image-Jun-4-2025-10-38-10-PM.png',
      }}
      style={{flex: 1}}>
      <GoBackArrow text={'Profile'} />
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
            uri: user?.ProfileImg ?? 'https://i.ibb.co/8gPTcpK/girl1.jpg',
            priority: FastImage.priority.high,
          }}
          // resizeMode="contain"
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
            {user?.Name}
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
            <Text
              style={{
                color: color.white,
                fontFamily: Font.Regular,
                fontSize: width * 0.04,
              }}>
              Posts:
            </Text>
            <Text
              style={{
                color: color.white,
                fontFamily: Font.Regular,
                fontSize: width * 0.04,
              }}>
              {user?.Post?.length}
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
            Posts
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              rowGap: 10,
              paddingHorizontal: 15,
              // borderWidth: 1,
              borderColor: 'blue',
              flex: 1,
            }}>
            <FlatList
              data={user?.Post}
              keyExtractor={item => item?._id}
              contentContainerStyle={{
                rowGap: 10,
                justifyContent: 'space-between',
                // borderWidth: 1,
                borderColor: 'red',
                width: '100%',
                flexWrap: 'wrap',
              }}
              horizontal={true}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    borderRadius: 5,
                    overflow: 'hidden',
                    // borderWidth: 1,
                    borderColor: 'red',
                    width: width * 0.44,
                  }}>
                  <FastImage
                    source={{
                      uri: item?.PostImage,
                      priority: FastImage.priority.high,
                    }}
                    // resizeMode="contain"
                    style={{
                      width: '100%',
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
                        fontFamily: Font.SemiBold,
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
    </ImageBackground>
  );
};

export default Profile;
