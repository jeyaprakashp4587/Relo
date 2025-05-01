import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const AutoLogin = async () => {
      try {
        const id = await AsyncStorage.getItem('user_id');
        if (id) {
          navigation.replace('Tab');
        } else {
          navigation.navigate('SignIn');
        }
      } catch (error) {
        navigation('SignIn');
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
