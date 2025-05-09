import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Navigation from '../Navigation/Navigation';
import axios from 'axios';
import {Api} from '../Api/Api';
import {color} from '../Const/Color';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Font} from '../Const/Font';
const {width, height} = Dimensions.get('window');
const SignIn = () => {
  return (
    <View style={{backgroundColor: color.black, flex: 1}}>
      {/* logo */}
      <View
        style={{
          // borderWidth: 1,
          borderColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          source={require('../assets/ic_launcher_round.png')}
          resizeMode="contain"
          priority={FastImage.priority.high}
          style={{width: width * 0.75, aspectRatio: 1}}
        />
      </View>
      {/* Text inputs */}
      <View style={{paddingHorizontal: 15, rowGap: 10}}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          // ref={nameRef}
          style={styles.input}
          // value={name}
          // onChangeText={text => {
          //   setName(text);
          //   setErrors({...errors, name: ''});
          // }}
          placeholder="Enter name"
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          // ref={nameRef}
          style={styles.input}
          // value={name}
          // onChangeText={text => {
          //   setName(text);
          //   setErrors({...errors, name: ''});
          // }}
          placeholder="Password"
          placeholderTextColor="#888"
        />
        <LinearGradient
          colors={['rgb(17, 66, 129)', 'rgb(9, 52, 102)']}
          style={styles.button}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>signup</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={['rgb(245, 245, 245)', 'rgb(255, 255, 255)']}
          style={styles.button}>
          <TouchableOpacity>
            <Text
              style={{
                color: color.blue,
                fontFamily: Font.Medium,
                textAlign: 'center',
                letterSpacing: 0.3,
                fontSize: width * 0.04,
              }}>
              create new account
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  label: {
    fontSize: width * 0.05,

    fontFamily: Font.SemiBold,
    width: '80%',
    color: color.white,
    // display: 'none',
  },
  input: {
    borderWidth: 0,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    color: color.white,
    width: '100%',
    marginBottom: 20,
    fontFamily: Font.Medium,
    borderBottomWidth: 0.5,
    fontSize: width * 0.035,
  },
  button: {
    padding: 10,
    borderRadius: 50,
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: {
    fontFamily: Font.Medium,
    textAlign: 'center',
    letterSpacing: 0.3,
    fontSize: width * 0.04,
    color: 'white',
  },
});
