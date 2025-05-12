import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Api} from '../Api/Api';
import {useData} from '../Context/Contexter';
import FastImage from 'react-native-fast-image';
import {color} from '../Const/Color';

const Splash = () => {
  const navigation = useNavigation();
  const {setUser} = useData();
  const {width, height} = Dimensions.get('window');
  useEffect(() => {
    const AutoLogin = async () => {
      try {
        const id = await AsyncStorage.getItem('user_id');
        console.log(id);
        if (id) {
          const {status, data} = await axios(`${Api}/Login/getUser/${id}`);
          if (status === 200) {
            setUser(data.user);
            navigation.replace('Tab');
          }
        } else {
          navigation.replace('SignIn');
        }
      } catch (error) {
        navigation.navigate('SignIn');
      }
    };
    AutoLogin();
  }, []);
  return (
    <View
      style={{
        backgroundColor: color.black,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FastImage
        source={require('../assets/ic_launcher_round.png')}
        style={{width: width * 0.8, aspectRatio: 1}}
        priority={FastImage.priority.high}
        resizeMode="contain"
      />
    </View>
  );
};
export default Splash;
const styles = StyleSheet.create({});
