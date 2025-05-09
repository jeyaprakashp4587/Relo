import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import {Dimensions, Image, View} from 'react-native';
import {color} from '../Const/Color';
import Profile from '../Pages/Profile';
import Post from '../Pages/Post';
import {Font} from '../Const/Font';
import SignIn from '../LoginSystem/SignIn';
import Splash from '../LoginSystem/Splash';
import SignupScreen from '../LoginSystem/SignUpScreen';
const {width} = Dimensions.get('window');
const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: color.black,
          borderTopWidth: 0.25,
          borderColor: 'rgba(255, 255, 255, 0.14)',
        },
        tabBarItemStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontFamily: Font.Regular,
          color: color.white,
          fontSize: width * 0.02,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Image
              source={{uri: 'https://i.ibb.co/DD0gmYp/home.png'}}
              style={{width: 20, aspectRatio: 1, tintColor: 'white'}}
            />
          ),
          // tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: () => (
            <Image
              source={{uri: 'https://i.ibb.co/WWg5vdF/plus.png'}}
              style={{width: 20, aspectRatio: 1, tintColor: 'white'}}
            />
          ),
          // tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Image
              source={{uri: 'https://i.ibb.co/9Vck1rW/people.png'}}
              style={{width: 23, aspectRatio: 1, tintColor: 'white'}}
            />
          ),
          // tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};
const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Tab" component={TabNavigation} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
    </Stack.Navigator>
  );
};
const Navigation = () => {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </View>
  );
};

export default Navigation;
