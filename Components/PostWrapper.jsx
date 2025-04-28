import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color} from '../Const/Color';

const PostWrapper = () => {
  return (
    <View style={{borderWidth: 1, borderColor: 'red', marginTop: 10}}>
      <Text style={{color: color.white}}>Post</Text>
    </View>
  );
};

export default PostWrapper;

const styles = StyleSheet.create({});
