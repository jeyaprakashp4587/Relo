import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {color} from '../Const/Color';

const UserProfile = () => {
  const {user} = useRoute().params;
  return (
    <View style={{flex: 1, backgroundColor: color.black}}>
      <Text style={{color: 'white'}}>{user}</Text>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
