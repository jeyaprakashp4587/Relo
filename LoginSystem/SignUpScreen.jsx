import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {Font} from '../Const/Font';
import {color} from '../Const/Color';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {Api} from '../Api/Api';
import {useNavigation} from '@react-navigation/native';
import {useData} from '../Context/Contexter';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const SignupScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({name: '', email: '', password: ''});
  const {user, setUser} = useData();
  const offset = useSharedValue(0);
  const [image, setImage] = useState();
  const goToNextStep = useCallback(() => {
    // valid for username
    if (step === 0 && name.trim() === '') {
      setErrors({...errors, name: 'Name is required'});
      return;
    }
    // valid for email
    if (step === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrors({...errors, email: 'Enter a valid email'});
        return;
      }
    }
    // valid for pass
    if (step === 2 && password.length <= 6) {
      setErrors({
        ...errors,
        password: 'Password must be more than 6 characters',
      });
      return;
    }
    // QDS4FXo9kE4R3L4rKUsb8FFH8gU;
    setErrors({name: '', email: '', password: ''});
    const nextStep = step + 1;
    setStep(nextStep);
    offset.value = withTiming(-nextStep * width, {duration: 300});
  }, [step, name, email, password, errors, offset]);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const handleSubmit = useCallback(async () => {
    try {
      setLoadSubmit(true);
      const {data, status} = await axios.post(`${Api}/Login/signup`, {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        profile: image,
      });
      if (status === 200) {
        if (data?.message === 'Email has Already Been Taken') {
          ToastAndroid.show(data?.message, ToastAndroid.SHORT);
          setLoadSubmit(false);
          return;
        }
        if (data?.message === 'sucess') {
          await AsyncStorage.setItem('user_id', data.user._id.toString());
          setUser(data.user);
          ToastAndroid.show('signup sucessfully', ToastAndroid.SHORT);
          navigation.navigate('Tab');
          setLoadSubmit(false);
        }
      } else {
        ToastAndroid.show('something is wrong', ToastAndroid.SHORT);
        setLoadSubmit(false);
        navigation.navigate('Tab');
      }
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      setLoadSubmit(false);
    }
  }, [name, email, password, errors, image]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  useEffect(() => {
    if (step === 0 && nameRef.current) {
      nameRef.current.focus();
    } else if (step === 1 && emailRef.current) {
      emailRef.current.focus();
    } else if (step === 2 && passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [step]);
  // image processing
  const [hostImageIndi, setHostImageIndi] = useState(false);
  const selectImage = useCallback(async () => {
    try {
      setHostImageIndi(false);
      const options = {
        mediaType: 'photo',
        selectionLimit: 1,
      };
      const result = await launchImageLibrary(options);

      if (result.didCancel) return;
      if (result.errorMessage) throw new Error(result.errorMessage);

      if (result?.assets?.length > 0) {
        const asset = result.assets[0];
        const imgUrl = await hostImage(asset.uri);

        if (imgUrl) {
          setImage(imgUrl);
          setHostImageIndi(false);
          const nextStep = step + 1;
          setStep(nextStep);
          offset.value = withTiming(-nextStep * width, {duration: 300});
        }
      }
    } catch (error) {
      console.log('Image select/upload error:', error);
    }
  }, [hostImage, image, step, password]);
  const hostImage = useCallback(async imageUri => {
    try {
      setHostImageIndi(true);
      const data = new FormData();
      data.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'Post.jpg',
      });
      data.append('upload_preset', 'ml_default');
      data.append('api_key', 'QDS4FXo9kE4R3L4rKUsb8FFH8gU');
      let res = await fetch(
        'https://api.cloudinary.com/v1_1/dv72gyrn1/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );
      let result = await res.json();
      return await result.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, animatedStyle]}>
        {/* Step 1 */}
        <View style={styles.step}>
          <View style={styles.content}>
            <Text style={styles.label}>What's your name?</Text>
            <TextInput
              ref={nameRef}
              style={[styles.input, errors.name ? styles.errorInput : null]}
              value={name}
              onChangeText={text => {
                setName(text);
                setErrors({...errors, name: ''});
              }}
              placeholder="Enter name"
              placeholderTextColor="#888"
            />
            {errors.name && step === 0 ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </View>
          <LinearGradient
            colors={['rgb(17, 66, 129)', 'rgb(9, 52, 102)']}
            style={styles.button}>
            <TouchableOpacity onPress={goToNextStep}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {/* Step 2 */}
        <View style={styles.step}>
          <View style={styles.content}>
            <Text style={styles.label}>Enter your email</Text>
            <TextInput
              ref={emailRef}
              style={[styles.input, errors.email ? styles.errorInput : null]}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setErrors({...errors, email: ''});
              }}
              keyboardType="email-address"
              placeholder="Enter email"
              placeholderTextColor="#888"
            />
            {errors.email && step === 1 ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>
          <LinearGradient
            colors={['rgb(17, 66, 129)', 'rgb(9, 52, 102)']}
            style={styles.button}>
            <TouchableOpacity onPress={goToNextStep}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {/* Step 3 */}
        <View style={styles.step}>
          <View style={styles.content}>
            <Text style={styles.label}>Create a password</Text>
            <TextInput
              ref={passwordRef}
              style={[styles.input, errors.password ? styles.errorInput : null]}
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrors({...errors, password: ''});
              }}
              secureTextEntry
              placeholder="Enter password"
              placeholderTextColor="#888"
            />
            {errors.password && step === 2 ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>
          <LinearGradient
            colors={['rgb(17, 66, 129)', 'rgb(9, 52, 102)']}
            style={styles.button}>
            <TouchableOpacity onPress={goToNextStep}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {/* step 4 */}
        <View style={styles.step}>
          <View style={styles.content}>
            <Text style={styles.label}>Upload a Profile Photo</Text>
            <FastImage
              source={{
                uri: image ? image : 'https://i.ibb.co/Y4NtjRR0/user.png',
                priority: FastImage.priority.high,
              }}
              resizeMode="cover"
              style={{
                width: width * 0.4,
                aspectRatio: 1,
                marginTop: 30,
                borderRadius: 2000,
                borderWidth: image ? 1 : 0,
                borderColor: 'white',
                alignSelf: 'center',
              }}
            />
          </View>
          <LinearGradient
            colors={['rgb(17, 66, 129)', 'rgb(9, 52, 102)']}
            style={styles.button}>
            <TouchableOpacity onPress={selectImage}>
              {hostImageIndi ? (
                <ActivityIndicator color={color.white} size={28} />
              ) : (
                <Text style={styles.buttonText}>upload</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {/* complete */}
        <View style={styles.step}>
          <View style={styles.content}>
            <View
              style={{
                // flexDirection: 'row',
                alignItems: 'center',
                // borderWidth: 1,
                borderColor: 'blue',
                width: '100%',
                columnGap: 20,
                justifyContent: 'center',
              }}>
              <FastImage
                source={{
                  uri: image ? image : 'https://i.ibb.co/Y4NtjRR0/user.png',
                  priority: FastImage.priority.high,
                }}
                resizeMode="cover"
                style={{
                  width: width * 0.35,
                  aspectRatio: 1,
                  borderRadius: 2000,
                  borderWidth: image ? 1 : 0,
                  borderColor: 'white',
                }}
              />
              <Text
                style={{
                  color: color.white,
                  fontFamily: Font.Medium,
                  fontSize: width * 0.1,
                  // borderWidth: 1,
                  borderColor: 'red',
                  width: '100%',
                  textAlign: 'center',
                }}>
                {name}
              </Text>
              <Text
                style={{
                  color: color.white,
                  fontFamily: Font.Medium,
                  width: '100%',
                  textAlign: 'center',
                }}>
                {email}
              </Text>
            </View>
          </View>
          <LinearGradient
            colors={['rgb(17, 66, 129)', 'rgb(9, 52, 102)']}
            style={styles.button}>
            <TouchableOpacity onPress={handleSubmit}>
              {loadSubmit ? (
                <ActivityIndicator color={color.white} size={28} />
              ) : (
                <Text style={styles.buttonText}>complete</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Animated.View>
      {/* Pagination Dots */}
      <PaginationDots stepOffset={offset} />
    </View>
  );
};

const PaginationDots = ({stepOffset}) => {
  const dotCount = 4;

  return (
    <View style={styles.dotsContainer}>
      {Array.from({length: dotCount}).map((_, i) => {
        const dotStyle = useAnimatedStyle(() => {
          const inputRange = [-width * (i + 1), -width * i, -width * (i - 1)];
          const scale = interpolate(
            stepOffset.value,
            inputRange,
            [0.8, 1.4, 0.8],
            Extrapolate.CLAMP,
          );
          const opacity = interpolate(
            stepOffset.value,
            inputRange,
            [0.3, 1, 0.3],
            Extrapolate.CLAMP,
          );
          return {
            transform: [{scale}],
            opacity,
          };
        });

        return <Animated.View key={i} style={[styles.dot, dotStyle]} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  slider: {
    flexDirection: 'row',
    width: width * 3,
    flex: 1,
  },
  step: {
    flexDirection: 'column',
    width: width,
    padding: 30,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  label: {
    fontSize: width * 0.09,
    marginBottom: 10,
    fontFamily: Font.SemiBold,
    width: '80%',
    color: color.white,
  },
  input: {
    borderWidth: 0,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    color: color.white,
    width: '100%',
    marginBottom: 10,
    fontFamily: Font.Medium,
    borderBottomWidth: 0.5,
    fontSize: width * 0.04,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    fontFamily: Font.Regular,
    fontSize: width * 0.025,
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
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgb(17, 66, 129)',
  },
});

export default SignupScreen;
