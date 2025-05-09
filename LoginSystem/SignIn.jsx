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
const {width, height} = Dimensions.get('window');

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toastand.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Both email and password are required.',
      });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${Api}/auth/login`, {
        email,
        password,
      });
      setLoading(false);
      if (response.data.success) {
        ToastAndroid.show(
          {
            type: 'success',
            text1: 'Login Successful',
          },
          ToastAndroid.SHORT,
        );
        navigation.replace('Home');
      } else {
        ToastAndroid.show(
          {
            type: 'error',
            text1: 'Login Failed',
            text2: response.data.message || 'Invalid credentials.',
          },
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      setLoading(false);
      ToastAndroid.show(
        {
          type: 'error',
          text1: 'Network Error',
          text2: 'Unable to connect to the server.',
        },
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <ScrollView
      style={{backgroundColor: color.black, flex: 1, paddingBottom: 20}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FastImage
          source={require('../assets/ic_launcher_round.png')}
          resizeMode="contain"
          priority={FastImage.priority.high}
          style={{width: width * 0.75, aspectRatio: 1}}
        />
      </View>

      <View style={{paddingHorizontal: 15, rowGap: 10}}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
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
              <ActivityIndicator color="white" />
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
