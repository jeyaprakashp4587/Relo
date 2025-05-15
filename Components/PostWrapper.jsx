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
import React, {useCallback, useState} from 'react';
import {color} from '../Const/Color';
import FastImage from 'react-native-fast-image';
import {Font} from '../Const/Font';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {Api} from '../Api/Api';

const PostWrapper = ({Post}) => {
  const {width, height} = Dimensions.get('window');
  const [isShowModel, setIsShowModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  // set the post values in state
  const [postVote, setPostVote] = useState({
    user1: Post?.user1?.Post?.PostVote,
    user2: Post?.user2?.Post?.PostVote,
  });
  const [postStreak, setPostStreak] = useState({
    user1: Post?.user1?.Post?.PostStreak,
    user2: Post?.user2?.Post?.PostStreak,
  });
  const [postDisVote, setPostDisVote] = useState({
    user1: Post?.user1?.Post?.PostDisVote,
    user2: Post?.user2?.Post?.PostDisVote,
  });
  // const vote
  const handleVote = useCallback(
    async (winner, losser, winnerPost, losserPost) => {
      try {
        const {data, status} = await axios.post(`${Api}/Post/vote`, {
          winner: String(winner),
          losser: String(losser),
          winnerPost: String(winnerPost),
          losserPost: String(losserPost),
        });
        if (status === 200) {
          setPostVote(prev => ({...prev, user1: prev.user1 + 1}));
          setPostStreak(prev => ({...prev, user1: prev.user1 + 1}));
          setPostDisVote(prev => ({
            ...prev,
            user2: (prev.user2 || 0) + 1,
          }));
        }
      } catch (error) {
        ToastAndroid.show('something is wrong', ToastAndroid.SHORT);
      }
    },
    [postVote, postDisVote, postStreak],
  );
  return (
    <View
      style={{
        // borderColor: 'white',
        marginVertical: 'auto',
        width: width,
        alignSelf: 'center',
        height: height * 0.6,
        backgroundColor: color.black,
        borderWidth: 1,
      }}>
      {/* show dominator */}
      <LinearGradient
        colors={[
          Post?.user1.Post?.PostVote == Post?.user2?.Post?.PostDisVote
            ? 'rgb(235, 109, 109)'
            : color.blue,
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
        <FastImage
          source={{uri: 'https://i.ibb.co/zWW0wqG0/security.png'}}
          resizeMode="contain"
          priority={FastImage.priority.high}
          style={{width: 20, aspectRatio: 1}}
        />
        {Post?.user1.Post?.PostVote == Post?.user2?.Post?.PostDisVote ? (
          <Text
            style={{
              color: color.white,
              fontFamily: Font.SemiBold,
              letterSpacing: 0.4,
            }}>
            Tied
          </Text>
        ) : (
          <Text
            style={{
              color: color.white,
              fontFamily: Font.SemiBold,
              letterSpacing: 0.4,
            }}>
            Dominator:{' '}
            {Post?.user1.Post?.PostVote > Post?.user2?.Post?.PostDisVote
              ? Post?.user1.username
              : Post?.user2?.username}
          </Text>
        )}
      </LinearGradient>
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
                borderRadius: 10,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 0,
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
              justifyContent: 'center',
            }}>
            <FastImage
              source={{
                uri: Post?.user1?.profileImage,
                priority: FastImage.priority.high,
              }}
              // resizeMode="contain"
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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: 2,
              }}>
              <FastImage
                source={{uri: 'https://i.ibb.co/VrbW9xf/bolt.png'}}
                resizeMode="contain"
                style={{width: 15, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontSize: width * 0.027}}>
                {postStreak.user1}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: 2,
              }}>
              <FastImage
                source={{uri: 'https://i.ibb.co/B5kH5kfv/increase.png'}}
                resizeMode="contain"
                style={{width: 15, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontSize: width * 0.027}}>
                {postVote.user1}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: 2,
              }}>
              <FastImage
                source={{uri: 'https://i.ibb.co/w3LB3gg/decrease.png'}}
                resizeMode="contain"
                style={{width: 15, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontSize: width * 0.027}}>
                {postDisVote.user1}
              </Text>
            </View>
          </View>
          {/* vote button */}
          <TouchableOpacity
            onPress={() =>
              handleVote({
                winner: Post?.user1?._id,
                losser: Post?.user2?._id,
                winnerPost: Post?.user1?.Post?._id,
                losserPost: Post?.user2?.Post?._id,
              })
            }
            style={{
              padding: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 5,
              backgroundColor: color.white,
              borderRadius: 50,
            }}>
            <Text
              style={{
                color: color.black,
                textAlign: 'center',
                fontFamily: Font.SemiBold,
                fontSize: width * 0.032,
                letterSpacing: 0.3,
              }}>
              vote
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
                borderRadius: 10,
                borderTopLeftRadius: 0,
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
              // backgroundColor: color.Bg,
              padding: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <FastImage
              source={{
                uri: Post?.user2?.profileImage,
                priority: FastImage.priority.high,
              }}
              // resizeMode="contain"
              style={{width: 40, aspectRatio: 1, borderRadius: 50}}
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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: 2,
              }}>
              <FastImage
                source={{uri: 'https://i.ibb.co/VrbW9xf/bolt.png'}}
                resizeMode="contain"
                style={{width: 15, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontSize: width * 0.027}}>
                {postStreak.user2}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: 2,
              }}>
              <FastImage
                source={{uri: 'https://i.ibb.co/B5kH5kfv/increase.png'}}
                resizeMode="contain"
                style={{width: 15, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontSize: width * 0.027}}>
                {postVote.user2}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: 2,
              }}>
              <FastImage
                source={{uri: 'https://i.ibb.co/w3LB3gg/decrease.png'}}
                resizeMode="contain"
                style={{width: 15, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontSize: width * 0.027}}>
                {postDisVote.user2}
              </Text>
            </View>
          </View>
          {/* vote button */}
          <TouchableOpacity
            onPress={() =>
              handleVote({
                winner: Post?.user2?._id,
                losser: Post?.user1?._id,
                winnerPost: Post?.user2?.Post?._id,
                losserPost: Post?.user1?.Post?._id,
              })
            }
            style={{
              padding: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 5,
              backgroundColor: color.white,
              borderRadius: 50,
            }}>
            <Text
              style={{
                color: color.black,
                textAlign: 'center',
                fontFamily: Font.SemiBold,
                fontSize: width * 0.032,
                letterSpacing: 0.3,
              }}>
              vote
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
