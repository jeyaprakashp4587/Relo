import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Api} from '../Api/Api';
import {useData} from '../Context/Contexter';

const Splash = () => {
  const navigation = useNavigation();
  const {setUser} = useData();
  useEffect(() => {
    const AutoLogin = async () => {
      try {
        const id = await AsyncStorage.getItem('user_id');
        console.log(id);
        if (id) {
          const {status, data} = await axios(`${Api}/Login/getUser/${id}`);
          if (status === 200) {
            setUser(data.user);
            console.log(data.user);
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
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
