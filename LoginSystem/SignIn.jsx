import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from '../Navigation/Navigation';

const SignIn = () => {
  const googleAuth = useCallback(async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const firebaseUser = userCredential.user;
      const uid = firebaseUser.uid;
      if (uid) {
        Navigation.replace('Tab');
      }
      await AsyncStorage.setItem('user_uid', uid);
      console.log('User signed in!', userCredential.user);
    } catch (error) {
      console.error('Google Sign-In Error', error);
    }
  }, []);
  return (
    <View>
      <Text>SignIn</Text>
      <TouchableOpacity
        style={{backgroundColor: 'red', padding: 10}}
        onPress={googleAuth}>
        <Text style={{textAlign: 'center'}}>sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
