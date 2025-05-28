import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {color} from '../Const/Color';
import FastImage from 'react-native-fast-image';
import {Font} from '../Const/Font';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {Api} from '../Api/Api';

const PostWrapper = ({Post, goNext}) => {
  const {width, height} = Dimensions.get('window');
  const [isShowModel, setIsShowModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [voteIndi, setVoteIndi] = useState({
    user1: false,
    user2: false,
  });
  // set the post values in state
  const [postVote, setPostVote] = useState({
    user1: Post?.user1?.Post?.PostVote || 0,
    user2: Post?.user2?.Post?.PostVote || 0,
  });
  const [postStreak, setPostStreak] = useState({
    user1: Post?.user1?.Post?.PostStreak || 0,
    user2: Post?.user2?.Post?.PostStreak || 0,
  });
  const [postDisVote, setPostDisVote] = useState({
    user1: Post?.user1?.Post?.PostDisVote || 0,
    user2: Post?.user2?.Post?.PostDisVote || 0,
  });
  const handleVote = useCallback(
    async user => {
      try {
        const {data, status} = await axios.post(`${Api}/Post/vote`, {
          winner: user === 'user1' ? Post?.user1?._id : Post?.user2?._id,
          losser: user === 'user1' ? Post?.user2?._id : Post?.user1?._id,
          winnerPost:
            user === 'user1' ? Post?.user1?.Post?._id : Post?.user2?.Post?._id,
          losserPost:
            user === 'user1' ? Post?.user2?.Post?._id : Post?.user1?.Post?._id,
          voter: user?._id,
        });
        if (status === 200) {
          if (user === 'user1') {
            setPostVote(prev => ({...prev, user1: (prev.user1 || 0) + 1}));
            setPostStreak(prev => ({...prev, user1: (prev.user1 || 0) + 1}));
            setPostDisVote(prev => ({
              ...prev,
              user2: (prev.user2 || 0) + 1,
            }));
            setPostStreak(prev => ({...prev, user2: 0}));
            setVoteIndi({user1: true, user2: false});
          } else {
            setPostVote(prev => ({...prev, user2: (prev.user2 || 0) + 1}));
            setPostStreak(prev => ({...prev, user2: (prev.user2 || 0) + 1}));
            setPostDisVote(prev => ({
              ...prev,
              user1: (prev.user1 || 0) + 1,
            }));
            setPostStreak(prev => ({...prev, user1: 0}));
            setVoteIndi({user1: false, user2: true});
          }
        }
      } catch (error) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        console.error(error);
      } finally {
        // goNext();
      }
    },
    [Post],
  );
  useEffect(() => {
    setPostVote({
      user1: Post?.user1?.Post?.PostVote || 0,
      user2: Post?.user2?.Post?.PostVote || 0,
    });
    setPostStreak({
      user1: Post?.user1?.Post?.PostStreak || 0,
      user2: Post?.user2?.Post?.PostStreak || 0,
    });
    setPostDisVote({
      user1: Post?.user1?.Post?.PostDisVote || 0,
      user2: Post?.user2?.Post?.PostDisVote || 0,
    });
  }, [Post]);
  return (
    <View
      style={{
        width: width,
        alignSelf: 'center',
        height: height * 0.6,
        backgroundColor: color.black,
        borderWidth: 1,
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
          <TouchableOpacity
            onPress={() => {
              setIsShowModel(true);
              setSelectedImage(Post?.user1?.Post?.PostImage);
            }}>
            <FastImage
              source={{
                uri: Post?.user1?.Post?.PostImage,
                priority: FastImage.priority.high,
              }}
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 0,
            borderColor: 'red',
            flex: 1,
            padding: 15,
            flexDirection: 'column',
            justifyContent: 'center',
            rowGap: 5,
            backgroundColor: color.black,
          }}>
          {/* profile info */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 8,
              padding: 10,
              borderRadius: 10,
              justifyContent: 'flex-start',
            }}>
            <FastImage
              source={{
                uri: Post?.user1?.profileImage,
                priority: FastImage.priority.high,
              }}
              style={{
                width: 40,
                aspectRatio: 1,
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                color: color.white,
                fontFamily: Font.SemiBold,
                fontSize: width * 0.036,
                letterSpacing: 0.2,
              }}>
              {Post?.user1?.username}
            </Text>
          </View>
          {/* image info */}
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
              }}>
              {/* <Image
                source={{uri: 'https://i.ibb.co/VrbW9xf/bolt.png'}}
                style={{
                  width: 15,
                  aspectRatio: 1,
                  tintColor: 'rgba(255, 255, 255, 0.47)',
                }}
              /> */}
              <Text style={{fontFamily: Font.Regular}}>streak: </Text>
              <Text
                style={{
                  color: color.white,
                  fontSize: width * 0.027,
                  fontFamily: Font.Medium,
                }}>
                {postStreak.user1}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
              }}>
              {/* <Image
                source={{uri: 'https://i.ibb.co/B5kH5kfv/increase.png'}}
                style={{
                  width: 15,
                  aspectRatio: 1,
                  tintColor: 'rgba(255, 255, 255, 0.47)',
                }}
              /> */}
              <Text style={{fontFamily: Font.Regular}}>vote: </Text>
              <Text
                style={{
                  color: color.white,
                  fontSize: width * 0.027,
                  fontFamily: Font.Medium,
                }}>
                {postVote.user1}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
              }}>
              {/* <Image
                source={{uri: 'https://i.ibb.co/w3LB3gg/decrease.png'}}
                style={{
                  width: 15,
                  aspectRatio: 1,
                  tintColor: 'rgba(255, 255, 255, 0.47)',
                }}
              /> */}
              <Text style={{fontFamily: Font.Regular}}>disvote: </Text>
              <Text
                style={{
                  color: color.white,
                  fontSize: width * 0.027,
                  fontFamily: Font.Medium,
                }}>
                {postDisVote.user1}
              </Text>
            </View>
          </View>
          {/* vote button */}
          <TouchableOpacity
            onPress={() => !voteIndi.user1 && handleVote('user1')}
            style={{
              padding: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 5,
              backgroundColor: voteIndi.user1 ? color.white : color.Bg,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'rgb(255, 255, 255)',
            }}>
            <Text
              style={{
                color: voteIndi.user1 ? color.black : color.white,
                textAlign: 'center',
                fontFamily: Font.SemiBold,
                fontSize: width * 0.032,
                letterSpacing: 0.3,
              }}>
              {voteIndi.user1 ? 'voted' : 'vote'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* show dominator */}
      <LinearGradient
        colors={[
          Post?.user1.Post?.PostVote == Post?.user2?.Post?.PostDisVote
            ? 'rgb(235, 109, 109)'
            : 'rgba(33, 72, 95, 0.64)',
          'rgba(0, 0, 0, 0.09)',
        ]}
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 5,
        }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        {Post?.user1.Post?.PostVote == Post?.user2?.Post?.PostDisVote ? (
          <Text
            style={{
              color: color.white,
              fontFamily: Font.SemiBold,
              letterSpacing: 0.4,
              textAlign: 'center',
            }}>
            Tied
          </Text>
        ) : (
          <Text
            style={{
              color: color.white,
              fontFamily: Font.SemiBold,
              letterSpacing: 0.4,
              textAlign: 'center',
              width: '100%',
            }}>
            Dominator:{' '}
            {Post?.user1.Post?.PostVote > Post?.user2?.Post?.PostVote
              ? Post?.user1.username
              : Post?.user2?.username}
          </Text>
        )}
      </LinearGradient>
      {/* second user */}
      <View
        style={{
          flexDirection: 'row-reverse',
          flex: 1,
        }}>
        <View style={{borderWidth: 0, borderColor: 'red', width: '50%'}}>
          <TouchableOpacity
            onPress={() => {
              setIsShowModel(true);
              setSelectedImage(Post?.user2?.Post?.PostImage);
            }}>
            <FastImage
              source={{
                uri: Post?.user2?.Post?.PostImage,
                priority: FastImage.priority.high,
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 0,
            borderColor: 'red',
            padding: 15,
            width: '50%',
            flexDirection: 'column',
            justifyContent: 'center',
            rowGap: 5,
            backgroundColor: color.black,
          }}>
          {/* profile info */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 8,
              padding: 10,
              borderRadius: 10,
              justifyContent: 'flex-start',
              // borderWidth: 1,
              borderColor: 'red',
            }}>
            <FastImage
              source={{
                uri: Post?.user2?.profileImage,
                priority: FastImage.priority.high,
              }}
              // resizeMode="contain"
              style={{width: 50, aspectRatio: 1, borderRadius: 50}}
            />
            <Text
              style={{
                color: color.white,
                fontFamily: Font.SemiBold,
                fontSize: width * 0.036,
                letterSpacing: 0.2,
              }}>
              {Post?.user2?.username}
            </Text>
          </View>
          {/* image info */}
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
              }}>
              {/* <Image
                source={{uri: 'https://i.ibb.co/VrbW9xf/bolt.png'}}
                style={{
                  width: 15,
                  aspectRatio: 1,
                  tintColor: 'rgba(255, 255, 255, 0.47)',
                }}
              /> */}
              <Text style={{fontFamily: Font.Regular}}>streak: </Text>
              <Text
                style={{
                  color: color.white,
                  fontSize: width * 0.027,
                  fontFamily: Font.Medium,
                }}>
                {postStreak.user2}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
              }}>
              {/* <Image
                source={{uri: 'https://i.ibb.co/B5kH5kfv/increase.png'}}
                // resizeMode="contain"
                style={{
                  width: 15,
                  aspectRatio: 1,
                  tintColor: 'rgba(255, 255, 255, 0.47)',
                }}
              /> */}
              <Text style={{fontFamily: Font.Regular}}>vote: </Text>
              <Text
                style={{
                  color: color.white,
                  fontSize: width * 0.027,
                  fontFamily: Font.Medium,
                }}>
                {postVote.user2}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
              }}>
              {/* <Image
                source={{uri: 'https://i.ibb.co/w3LB3gg/decrease.png'}}
                resizeMode="contain"
                style={{
                  width: 15,
                  aspectRatio: 1,
                  tintColor: 'rgba(255, 255, 255, 0.47)',
                }}
              /> */}
              <Text style={{fontFamily: Font.Regular}}>disvote: </Text>
              <Text
                style={{
                  color: color.white,
                  fontSize: width * 0.027,
                  fontFamily: Font.Medium,
                }}>
                {postDisVote.user2}
              </Text>
            </View>
          </View>
          {/* vote button */}
          <TouchableOpacity
            onPress={() => !voteIndi.user2 && handleVote('user2')}
            style={{
              padding: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 5,
              backgroundColor: voteIndi.user2 ? color.white : color.Bg,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'rgb(255, 255, 255)',
            }}>
            <Text
              style={{
                color: voteIndi.user2 ? color.black : color.white,
                textAlign: 'center',
                fontFamily: Font.SemiBold,
                fontSize: width * 0.032,
                letterSpacing: 0.3,
              }}>
              {voteIndi.user2 ? 'voted' : 'vote'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* model for sho user clicked image for larger view */}
      <Modal transparent={true} visible={isShowModel}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.89)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 20,
          }}>
          <FastImage
            source={{
              uri: selectedImage,
              priority: FastImage.priority.high,
            }}
            resizeMode="contain"
            style={{
              width: width * 0.9,
              aspectRatio: 1,
            }}
          />
          <TouchableOpacity
            onPress={() => setIsShowModel(false)}
            style={{
              padding: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 5,
              backgroundColor: color.blue,
              borderRadius: 50,
              width: '90%',
            }}>
            <Text
              style={{
                color: color.white,
                textAlign: 'center',
                fontFamily: Font.SemiBold,
                fontSize: width * 0.035,
                letterSpacing: 0.3,
              }}>
              close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default PostWrapper;

const styles = StyleSheet.create({});
