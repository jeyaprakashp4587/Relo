// Updated PostWrapper.js with centralized StyleSheet
import {
  Dimensions,
  ImageBackground,
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
import FadeView from './FadeView';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const PostWrapper = ({Post, goNext}) => {
  const navigation = useNavigation();
  const [isShowModel, setIsShowModel] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [voteIndi, setVoteIndi] = useState({user1: false, user2: false});
  const [postVote, setPostVote] = useState({
    user1: Post?.user1?.Post?.PostVote || 0,
    user2: Post?.user2?.Post?.PostVote || 0,
  });
  const [postStreak, setPostStreak] = useState({
    user1: Post?.user1?.Post?.PostStreak || 0,
    user2: Post?.user2?.Post?.PostStreak || 0,
  });
  const [showFade, setShowFade] = useState({user1: false, user2: false});
  const [isVoting, setIsVoting] = useState(false);
  const [dominator, setDominator] = useState('Tied');

  const handleClick = userKey => {
    setShowFade(prev => ({...prev, [userKey]: false}));
    setTimeout(() => {
      setShowFade(prev => ({...prev, [userKey]: true}));
    }, 10);
  };

  const handleVote = useCallback(
    async user => {
      if (isVoting) return;
      setIsVoting(true);
      try {
        const {status} = await axios.post(`${Api}/Post/vote`, {
          winner: user === 'user1' ? Post?.user1?._id : Post?.user2?._id,
          losser: user === 'user1' ? Post?.user2?._id : Post?.user1?._id,
          winnerPost:
            user === 'user1' ? Post?.user1?.Post?._id : Post?.user2?.Post?._id,
          losserPost:
            user === 'user1' ? Post?.user2?.Post?._id : Post?.user1?.Post?._id,
          voter: Post?.voterId,
        });

        if (status === 200) {
          if (user === 'user1') {
            setPostVote(prev => ({
              ...prev,
              user1: prev.user1 + 1,
              user2: prev.user2 - 1,
            }));
            setPostStreak(prev => ({...prev, user1: prev.user1 + 1, user2: 0}));
            setVoteIndi({user1: true, user2: false});
          } else {
            setPostVote(prev => ({
              ...prev,
              user2: prev.user2 + 1,
              user1: prev.user1 - 1,
            }));
            setPostStreak(prev => ({...prev, user2: prev.user2 + 1, user1: 0}));
            setVoteIndi({user1: false, user2: true});
          }
          handleClick(user);
        }
      } catch (error) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      } finally {
        setIsVoting(false);
      }
    },
    [Post, isVoting],
  );

  useEffect(() => {
    const user1Votes = postVote.user1 ?? 0;
    const user2Votes = postVote.user2 ?? 0;
    setDominator(
      user1Votes > user2Votes
        ? Post?.user1?.username
        : user2Votes > user1Votes
        ? Post?.user2?.username
        : 'Tied',
    );
  }, [postVote]);

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

  const renderUserSection = (userKey, isReversed = false) => {
    const user = Post?.[userKey];
    const isVoted = voteIndi[userKey];
    return (
      <View style={[styles.userRow, isReversed && styles.userRowReversed]}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity
            onPress={() => {
              setIsShowModel(true);
              setSelectedImage(user?.Post?.PostImagee);
            }}>
            <FastImage
              source={{uri: user?.Post?.PostImage}}
              style={styles.mainImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() => {
                setIsShowModel(true);
                setSelectedImage(user?.Post?.PostImage);
              }}>
              <Text style={styles.viewBtnText}>View</Text>
            </TouchableOpacity>
            <View style={styles.fadeViewWrapper}>
              {user?.Post?.PostMessage && (
                <FadeView
                  trigger={showFade[userKey]}
                  text={user?.Post?.PostMessage}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.infoBox}>
          <TouchableOpacity
            style={styles.profileBox}
            onPress={() => {
              navigation.navigate('userProfile', {user: user?._id});
            }}>
            <FastImage
              source={{uri: user?.profileImage}}
              style={styles.profileImage}
            />
            <Text style={styles.username}>{user?.username}</Text>
          </TouchableOpacity>
          <View style={styles.voteInfoBox}>
            <Text style={styles.labelText}>
              Streak:{' '}
              <Text style={styles.valueText}>{postStreak[userKey]}</Text>
            </Text>
            <Text style={styles.labelText}>
              Votes: <Text style={styles.valueText}>{postVote[userKey]}</Text>
            </Text>
          </View>
          <TouchableOpacity
            disabled={isVoting}
            onPress={() => !isVoted && handleVote(userKey)}
            style={[styles.voteBtn, isVoted && styles.votedBtn]}>
            <Text style={[styles.voteBtnText, isVoted && styles.votedBtnText]}>
              {isVoted ? 'Voted' : 'Vote'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://i.ibb.co/RT9Vsycp/Chat-GPT-Image-Jun-4-2025-10-38-10-PM.png',
      }}
      style={{flex: 1, height: height * 0.6, width: width}}>
      {renderUserSection('user1')}
      <View style={styles.dominatorBar}>
        <Text style={styles.dominatorText}>
          {dominator === 'Tied' ? 'Tied' : `Dominator: ${dominator}`}
        </Text>
      </View>
      {renderUserSection('user2', true)}
      <Modal transparent visible={isShowModel} animationType="fade">
        <View style={styles.modalView}>
          <FastImage
            source={{uri: selectedImage}}
            style={styles.modalImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() => setIsShowModel(false)}>
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default PostWrapper;

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    flex: 1,
  },
  userRowReversed: {
    flexDirection: 'row-reverse',
  },
  imageWrapper: {
    width: '60%',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  viewBtn: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: '50%',
    height: height * 0.04,
    backgroundColor: 'rgba(8, 8, 8, 0.43)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnText: {
    color: color.white,
    fontFamily: Font.Regular,
    fontSize: width * 0.035,
  },
  fadeViewWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    flex: 1,
    backgroundColor: 'rgba(98, 99, 100, 0.33)',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
  },
  profileBox: {
    alignItems: 'center',
    borderRadius: 10,
    rowGap: 5,
  },
  profileImage: {
    width: width * 0.17,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
  },
  username: {
    color: color.white,
    fontFamily: Font.SemiBold,
    fontSize: width * 0.04,
  },
  voteInfoBox: {
    alignItems: 'center',
    width: '100%',
    rowGap: 1,
  },
  labelText: {
    color: color.white,
    fontFamily: Font.Regular,
    fontSize: width * 0.035,
  },
  valueText: {
    fontFamily: Font.Medium,
  },
  voteBtn: {
    borderRadius: 5,
    backgroundColor: 'rgba(118, 116, 121, 0.21)',
    height: height * 0.044,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  votedBtn: {
    backgroundColor: color.white,
  },
  voteBtnText: {
    color: color.white,
    fontFamily: Font.SemiBold,
    fontSize: width * 0.032,
  },
  votedBtnText: {
    color: color.black,
  },
  dominatorBar: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dominatorText: {
    color: color.white,
    fontFamily: Font.SemiBold,
    letterSpacing: 0.3,
    textAlign: 'center',
    width: '100%',
    fontSize: width * 0.04,
  },
  modalView: {
    backgroundColor: 'rgba(0, 0, 0, 0.89)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
  },
  modalImage: {
    width: width * 0.9,
    aspectRatio: 1,
  },
  modalCloseBtn: {
    padding: 15,
    backgroundColor: color.blue,
    borderRadius: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    color: color.white,
    fontFamily: Font.SemiBold,
    fontSize: width * 0.035,
  },
});
