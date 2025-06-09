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
  const [isVoting, setIsVoting] = useState(false);
  const handleVote = useCallback(
    async user => {
      if (isVoting) return;
      setIsVoting(true);

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
            setPostStreak(prev => ({
              ...prev,
              user1: (prev.user1 || 0) + 1,
              user2: 0,
            }));
            setPostVote(prev => ({...prev, user2: (prev.user2 || 0) - 1}));
            setVoteIndi({user1: true, user2: false});
          } else {
            setPostVote(prev => ({...prev, user2: (prev.user2 || 0) + 1}));
            setPostStreak(prev => ({
              ...prev,
              user2: (prev.user2 || 0) + 1,
              user1: 0,
            }));
            setPostVote(prev => ({...prev, user1: (prev.user1 || 0) - 1}));
            setVoteIndi({user1: false, user2: true});
          }
          goNext();
        }
      } catch (error) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        console.error(error);
      } finally {
        setIsVoting(false);
      }
    },
    [Post, goNext, isVoting],
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
  }, [Post]);
  return (
    <View
      style={{
        width: width,
        alignSelf: 'center',
        height: height * 0.7,
        backgroundColor: color.black,
        // borderWidth: 1,
      }}>
      {/* first user */}
      <View
        style={{
          // borderWidth: 1,
          borderColor: 'red',
          flexDirection: 'row',
          flex: 1,
        }}>
        <View style={{borderWidth: 0, borderColor: 'red', width: '60%'}}>
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
            {/* large view  */}
            <TouchableOpacity
              onPress={() => {
                setIsShowModel(true);
                setSelectedImage(Post?.user1?.Post?.PostImage);
              }}
              style={{
                position: 'absolute',
                borderWidth: 1,
                borderColor: color.black,
                // padding: 2,
                borderRadius: 100,
                width: '60%',
                alignSelf: 'center',
                bottom: 10,
                height: height * 0.04,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: color.black,
                  textAlign: 'center',
                  fontFamily: Font.Medium,
                  fontSize: width * 0.035,
                }}>
                view
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderColor: 'red',
            flex: 1,
            padding: 15,
            flexDirection: 'column',
            justifyContent: 'space-around',
            rowGap: 5,
            backgroundColor: color.black,
            alignItems: 'center',
          }}>
          {/* profile info */}
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: 5,
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
                width: 50,
                aspectRatio: 1,
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                color: color.white,
                fontFamily: Font.SemiBold,
                fontSize: width * 0.04,
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
              <Text
                style={{
                  fontFamily: Font.Regular,
                  fontSize: width * 0.035,

                  color: color.white,
                }}>
                Streak:{' '}
              </Text>
              <Text
                style={{
                  color: color.white,
                  fontSize: width * 0.035,
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
              <Text
                style={{
                  fontFamily: Font.Regular,
                  fontSize: width * 0.035,
                  // letterSpacing: 0.3,
                  color: color.white,
                }}>
                Votes:{' '}
              </Text>
              <Text
                style={{
                  color: color.white,
                  fontSize: width * 0.035,
                  fontFamily: Font.Medium,
                }}>
                {postVote.user1}
              </Text>
            </View>
          </View>
          {/* vote button */}
          <TouchableOpacity
            disabled={isVoting}
            onPress={() => !voteIndi.user1 && handleVote('user1')}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              rowGap: 5,
              backgroundColor: voteIndi.user1 ? color.white : color.Bg,
              borderRadius: 50,
              height: height * 0.044,
              borderColor: 'rgb(255, 255, 255)',
              width: '100%',
            }}>
            <Text
              style={{
                color: voteIndi.user1 ? color.black : color.white,
                textAlign: 'center',
                fontFamily: Font.SemiBold,
                fontSize: width * 0.032,
                // letterSpacing: 0.3,
              }}>
              {voteIndi.user1 ? 'Voted' : 'Vote'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* show dominator */}
      <LinearGradient
        colors={[
          Post?.user1.Post?.PostVote == Post?.user2?.Post?.PostVote
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
        {Post?.user1.Post?.PostVote == Post?.user2?.Post?.PostVote ? (
          <Text
            style={{
              color: color.white,
              fontFamily: Font.SemiBold,
              letterSpacing: 0.4,
              textAlign: 'center',
              width: '100%',
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
        <View style={{borderWidth: 0, borderColor: 'red', width: '60%'}}>
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
            {/* large view  */}
            <TouchableOpacity
              onPress={() => {
                setIsShowModel(true);
                setSelectedImage(Post?.user2?.Post?.PostImage);
              }}
              style={{
                position: 'absolute',
                borderWidth: 1,
                borderColor: color.black,
                padding: 2,
                borderRadius: 100,
                width: '60%',
                alignSelf: 'center',
                bottom: 10,
                height: height * 0.04,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: color.black,
                  textAlign: 'center',
                  fontFamily: Font.Medium,
                  fontSize: width * 0.035,
                }}>
                view
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // borderWidth: 2,
            borderColor: 'red',
            padding: 15,
            flexDirection: 'column',
            justifyContent: 'space-around',
            rowGap: 5,
            backgroundColor: color.black,
            alignItems: 'center',
            flex: 1,
          }}>
          {/* profile info */}
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
              justifyContent: 'center',
              borderColor: 'red',
              rowGap: 5,
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
                fontSize: width * 0.04,
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
              <Text
                style={{
                  fontFamily: Font.Regular,
                  fontSize: width * 0.035,
                  // letterSpacing: 0.3,
                  color: color.white,
                }}>
                Streak:{' '}
              </Text>
              <Text
                style={{
                  color: color.white,
                  fontSize: width * 0.035,
                  fontFamily: Font.Medium,
                  // letterSpacing: 0.3,
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
              <Text
                style={{
                  fontFamily: Font.Regular,
                  fontSize: width * 0.035,
                  // letterSpacing: 0.3,
                  color: color.white,
                }}>
                Votes:{' '}
              </Text>
              <Text
                style={{
                  color: color.white,
                  fontSize: width * 0.035,
                  fontFamily: Font.Medium,
                  letterSpacing: 0.3,
                }}>
                {postVote.user2}
              </Text>
            </View>
          </View>
          {/* vote button */}
          <TouchableOpacity
            disabled={isVoting}
            onPress={() => !voteIndi.user2 && handleVote('user2')}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 5,
              backgroundColor: voteIndi.user2 ? color.white : color.Bg,
              borderRadius: 50,
              borderColor: 'rgb(255, 255, 255)',
              height: height * 0.044,
              width: '100%',
            }}>
            <Text
              style={{
                color: voteIndi.user2 ? color.black : color.white,
                textAlign: 'center',
                fontFamily: Font.SemiBold,
                fontSize: width * 0.032,
                // letterSpacing: 0.3,
              }}>
              {voteIndi.user2 ? 'Voted' : 'Vote'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* model for sho user clicked image for larger view */}
      <Modal transparent={true} visible={isShowModel} animationType="fade">
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
