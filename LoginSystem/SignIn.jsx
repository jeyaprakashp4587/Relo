import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Navigation from '../Navigation/Navigation';
import axios from 'axios';
import {Api} from '../Api/Api';
import {color} from '../Const/Color';
import FastImage from 'react-native-fast-image';
import {Font} from '../Const/Font';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useData} from '../Context/Contexter';
const {width, height} = Dimensions.get('window');

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {setUser} = useData();

  const handleLogin = useCallback(async () => {
    try {
      // Validate input early to avoid unnecessary network requests
      if (loading) return;
      if (!email.trim() || !password.trim()) {
        ToastAndroid.show(
          'Both email and password are required.',
          ToastAndroid.SHORT,
        );
        return;
      }
      setLoading(true);
      // Send the login request
      const response = await axios.post(`${Api}/Login/signIn`, {
        Email: email.trim(),
        Password: password.trim(),
      });
      // Handle successful login
      if (response.status === 200) {
        ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
        await AsyncStorage.setItem(
          'user_id',
          response.data.user?._id.toString(),
        );
        setUser(response.data?.user);
        navigation.replace('Tab');
      }
    } catch (error) {
      // Handle different error cases
      if (error.response) {
        const {status, data} = error.response;
        if (status === 401 || status === 404) {
          ToastAndroid.show(
            data.message || 'Email or Password is incorrect.',
            ToastAndroid.SHORT,
          );
        } else if (status === 400) {
          ToastAndroid.show(data.error || 'Invalid input.', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Unexpected server error.', ToastAndroid.SHORT);
        }
      } else {
        // Network or other unexpected errors
        ToastAndroid.show(
          'Network error. Please try again later.',
          ToastAndroid.SHORT,
        );
      }
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  return (
    <ScrollView
      style={{
        backgroundColor: color.black,
        flex: 1,
        paddingBottom: 20,
        padding: 0,
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FastImage
          source={require('../assets/ic_launcher_round.png')}
          resizeMode="contain"
          priority={FastImage.priority.high}
          style={{width: width * 0.75, aspectRatio: 1}}
        />
      </View>

      <View style={{paddingHorizontal: 25, rowGap: 10}}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          placeholderTextColor="#888"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          placeholderTextColor="#888"
          secureTextEntry
        />

        <LinearGradient colors={['#114281', '#093466']} style={styles.button}>
          <TouchableOpacity onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" size={25} />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={['#f5f5f5', '#ffffff']} style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={{
                color: color.black,
                fontFamily: Font.Medium,
                textAlign: 'center',
                letterSpacing: 0.3,
                fontSize: width * 0.04,
              }}>
              Create New Account
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  label: {
    fontSize: width * 0.05,
    fontFamily: Font.SemiBold,
    width: '80%',
    color: color.white,
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    color: color.white,
    width: '100%',
    marginBottom: 20,
    fontFamily: Font.Medium,
    fontSize: width * 0.035,
    paddingLeft: 0,
  },
  button: {
    // padding: 10,
    borderRadius: 50,
    alignSelf: 'center',
    width: '100%',
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Font.Medium,
    textAlign: 'center',
    letterSpacing: 0.3,
    fontSize: width * 0.04,
    color: 'white',
  },
});
