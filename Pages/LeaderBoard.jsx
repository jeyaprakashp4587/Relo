import {
  Dimensions,
  FlatList,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GoBackArrow from '../Components/GoBackArrow';
import {Api} from '../Api/Api';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import {Font} from '../Const/Font';
import {color} from '../Const/Color';
import Skeleton from '../skeleton/Skeleton';
const {width, height} = Dimensions.get('window');
const LeaderBoard = () => {
  const [top3, setTop3] = useState([]);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${Api}/Post/leaderboard?limit=10`);
        if (res.data.success) {
          const data = res.data.data;

          // 🧠 Split data
          const top3Users = data.slice(0, 3);
          const otherUsers = data.slice(3);
          console.log(data);

          setTop3(top3Users);
          setOthers(otherUsers);
        } else {
          setError('Failed to load leaderboard.');
        }
      } catch (err) {
        console.error('Leaderboard fetch error:', err);
        setError('Network/server error.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);
  // show leaderboard details
  const [showModel, setShowModel] = useState(false);
  if (loading)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Skeleton width={width} height={50} />
        <Skeleton width={width} height={100} />
        <Skeleton width={width} height={300} />
        <Skeleton width={width} height={100} />
        <Skeleton width={width} height={50} />
      </View>
    );
  if (error)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: color.white,
            fontFamily: Font.Medium,
            fontSize: width * 0.05,
          }}>
          {error}
        </Text>
      </View>
    );
  return (
    <ImageBackground
      source={{
        uri: 'https://i.ibb.co/RT9Vsycp/Chat-GPT-Image-Jun-4-2025-10-38-10-PM.png',
      }}
      style={{flex: 1, height: height * 1, paddingHorizontal: 15}}>
      <GoBackArrow text="Leader board" />
      {/* Head Text */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: color.white,
            textAlign: 'center',
            marginVertical: 20,
            fontFamily: Font.Medium,
            fontSize: width * 0.05,
            flex: 1,
          }}>
          Weekly Competition
        </Text>
        <TouchableOpacity onPress={() => setShowModel(true)}>
          <FastImage
            source={{
              uri: 'https://i.ibb.co/xxQcFzh/informaiton.png',
              priority: FastImage.priority.high,
            }}
            resizeMode="contain"
            style={{width: width * 0.07, aspectRatio: 1}}
          />
        </TouchableOpacity>
      </View>
      {/* top leaders */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          columnGap: 20,
          padding: 20,
        }}>
        {top3.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              rowGap: 5,
            }}>
            <View>
              <FastImage
                source={{
                  uri: item?.ProfileImg,
                  priority: FastImage.priority.high,
                }}
                // resizeMode="contain"
                style={{width: width * 0.25, aspectRatio: 1, borderRadius: 100}}
              />
              <FastImage
                source={{
                  uri:
                    index === 0
                      ? 'https://i.ibb.co/dJJGyRgX/winner.png'
                      : index === 1
                      ? 'https://i.ibb.co/n8bHgdTX/2nd-place.png'
                      : 'https://i.ibb.co/BHd3WJZm/3rd-place.png',
                }}
                resizeMode="contain"
                style={{
                  width: width * 0.1,
                  aspectRatio: 1,
                  position: 'absolute',
                  right: -5,
                  bottom: 0,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: width * 0.04,
                fontFamily: Font.Medium,
                color: color.white,
              }}>
              {item?.Name}
            </Text>
            <Text
              style={{
                color: color.white,
                fontSize: width * 0.034,
                fontFamily: Font.Regular,
              }}>
              Total Votes: {item?.TotalVotes}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <FastImage
                source={{
                  uri: 'https://i.ibb.co/B5bBhYb7/coin.png',
                  priority: FastImage.priority.high,
                }}
                resizeMode="contain"
                style={{width: width * 0.06, aspectRatio: 1}}
              />
              <Text style={{color: color.white, fontFamily: Font.SemiBold}}>
                {index === 0 ? 500 : index === 1 ? 300 : 200}
              </Text>
            </View>
          </View>
        ))}
      </View>
      {/* balance */}
      <View
        style={{
          backgroundColor: 'rgba(98, 100, 102, 0.33)',
          borderRadius: 5,
          padding: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 5,
            justifyContent: 'flex-end',
          }}>
          <FastImage
            source={{
              uri: 'https://i.ibb.co/B5bBhYb7/coin.png',
              priority: FastImage.priority.high,
            }}
            resizeMode="contain"
            style={{width: width * 0.05, aspectRatio: 1}}
          />
          <Text style={{color: color.white, fontFamily: Font.SemiBold}}>
            50
          </Text>
        </View>
        <FlatList
          data={others}
          keyExtractor={item => item?._id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                columnGap: 20,
              }}>
              <Text
                style={{
                  fontSize: width * 0.04,
                  fontFamily: Font.Medium,
                  color: color.white,
                }}>
                {item?.rank}
              </Text>
              <View style={{flex: 1, borderWidth: 0}}>
                <FastImage
                  source={{
                    uri: item?.ProfileImg,
                    priority: FastImage.priority.high,
                  }}
                  style={{
                    width: width * 0.15,
                    aspectRatio: 1,
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: width * 0.04,
                  fontFamily: Font.Medium,
                  color: color.white,
                  flex: 1,
                }}>
                {item?.Name}
              </Text>
              <Text
                style={{
                  color: color.white,
                  fontSize: width * 0.034,
                  fontFamily: Font.Regular,
                }}>
                Total Votes: {item?.TotalVotes}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* show leaderBoard details in model */}
      <Modal
        transparent
        visible={showModel}
        collapsable={true}
        animationType="slide"
        onRequestClose={() => setShowModel(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(53, 53, 53, 0.31)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: color.white,
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              rowGap: 20,
            }}>
            <Text
              style={{
                color: color.black,
                fontSize: width * 0.04,
                fontFamily: Font.Regular,
                borderBottomWidth: 0.5,
                borderColor: 'rgba(55, 56, 53, 0.33)',
                width: '100%',
                textAlign: 'center',
                padding: 10,
              }}>
              🏆 Leaderboard details
            </Text>
            {/*  */}
            <Text
              style={{
                marginTop: 10,
                width: '100%',
                textAlign: 'center',
                lineHeight: 30,
              }}>
              🥇 1st – 500 coins{'\n'}
              🥈 2nd – 300 coins{'\n'}
              🥉 3rd – 200 coins
            </Text>
            <Text
              style={{
                fontFamily: Font.Medium,
                fontSize: width * 0.04,
                textAlign: 'center',
                borderTopWidth: 0.6,
                borderColor: 'rgba(55, 56, 53, 0.33)',
                padding: 10,
              }}>
              This leaderboard will be refreshed on sunday night.
            </Text>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({});
